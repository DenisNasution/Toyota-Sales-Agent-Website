import express, { Response, Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import {
  PoolConnection,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
const db = require("../db/db_config");

// import User from "../models/User";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL_PROD
    : process.env.SERVER_URL_DEV;

// google strategy

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `http://localhost:3000/api/user/auth/callback`,
    proxy: true,
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // console.log(profile);
    try {
      let resultArray = [];
      db.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.query<[]>(
          `SELECT * FROM tb_user WHERE user_email = '${profile.email}'`,
          (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
              return done(null, result);
            } else {
              db.getConnection((err: QueryError, conn: PoolConnection) => {
                conn.beginTransaction(function (err) {
                  if (err) {
                    throw err;
                  }
                  const sql = `INSERT INTO tb_user(user_name, user_email, user_username ) VALUES (?,?,?)`;
                  const values = [
                    profile.displayName,
                    profile.email,
                    profile.displayName,
                  ];
                  conn.query(sql, values, function (err, result) {
                    if (err) {
                      conn.rollback(function () {
                        throw err;
                      });
                    }

                    conn.commit(function (err) {
                      if (err) {
                        conn.rollback(function () {
                          throw err;
                        });
                      }
                      conn.release();
                      const dataProfile = {
                        user_name: profile.displayName,
                        user_email: profile.email,
                        user_username: profile.displayName,
                      };
                      done(null, dataProfile);
                    });
                  });
                });
              });
            }
          }
        );
      });
    } catch (err: any) {
      throw new Error(err);
    }

    // try {
    //   db.getConnection((err: QueryError, conn: PoolConnection) => {
    //     conn.beginTransaction(function (err) {
    //       if (err) {
    //         throw err;
    //       }
    //       const sql = `INSERT INTO tb_user(user_name, user_email, user_username ) VALUES (?,?,?)`;
    //       const values = [
    //         profile.displayName,
    //         profile.email,
    //         profile.displayName,
    //       ];
    //       conn.query(sql, values, function (err, result) {
    //         if (err) {
    //           conn.rollback(function () {
    //             throw err;
    //           });
    //         }

    //         conn.commit(function (err) {
    //           if (err) {
    //             conn.rollback(function () {
    //               throw err;
    //             });
    //           }
    //           conn.release();
    //           const dataProfile = {
    //             user_name: profile.displayName,
    //             user_email: profile.email,
    //             user_username: profile.displayName,
    //           };
    //           done(null, dataProfile);
    //         });
    //       });
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }
);

passport.use(googleLogin);
