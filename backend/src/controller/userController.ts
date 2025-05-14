import express, { NextFunction, Request, Response } from "express";
import { PoolConnection, QueryError, ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";
const db = require("../db/db_config");
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { user_username, password } = req.body;
    const user_username = "yourUser";
    const password = "verySecurePassw0rd123!";

    let user = {
      user_username,
      password,
    };

    if (user_username === process.env.USER) {
      if (password === process.env.PASSWORD) {
        res.locals.user = user;
        next();
      } else {
        res.status(400).json({
          error: "Incorrect user_username or password",
        });
      }
    } else {
      res.status(400).json({
        error: "Incorrect username or password",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  const user_name = "req.body.user_name";
  const user_username = "req.body.user_username";
  const user_email = "kopinyfafasdaman_masdfsdadn@gmail.com";
  const user_password = await bcrypt.hash("req.body.user_password", 8);

  db.getConnection((err: QueryError, conn: PoolConnection) => {
    const sql = `SELECT user_email from tb_user WHERE user_email = ?`;
    const values = [user_email];
    conn.query<ResultSetHeader[]>(sql, values, async (err, result) => {
      if (err) throw err;
      conn.release();
      if (result.length !== 0)
        return res.status(400).json({ message: "Invalid email address" });

      const sql = `INSERT INTO tb_user(user_name, user_email, user_username, user_password ) VALUES (?,?,?,?)`;
      const values = [user_name, user_email, user_username, user_password];
      conn.query<ResultSetHeader>(sql, values, async (err, result) => {
        if (err) {
          throw err;
        }
        var idUser = result.insertId;
        if (err) {
          throw err;
        }
        conn.commit(function (err) {
          if (err) {
            conn.rollback(function () {
              throw err;
            });
          }
          return res.status(201).send({
            message: `user successfully created please login`,
          });
        });
      });

      // .catch((error) => {
      //   return res.status(401).json({ message: "Invalid email address" });
      // });
    });
  });
};

export { register, login };
