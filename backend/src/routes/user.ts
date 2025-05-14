import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { login, register } from "../controller/userController";
import axios from "axios";
const db = require("../db/db_config");
import { accessToken, isAuth } from "../middleware/utils";
import {
  PoolConnection,
  QueryError,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

const router = express.Router();

const expirationtimeInMs: any = process.env.JWT_EXPIRATION_TIME;
const jwtsec: any = process.env.JWT_SECRET;
const axiosPrivate = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

router.get("/login", login, async (req, res) => {
  let user;

  if (res.locals.user) {
    user = res.locals.user;
  } else {
    res.status(400).json({
      error: "user not found",
    });
  }

  const payload = {
    username: user.username,
    expiration: Date.now() + parseInt(expirationtimeInMs),
  };

  const token = jwt.sign(JSON.stringify(payload), jwtsec);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: false, //--> SET TO TRUE ON PRODUCTION
      maxAge: 60 * 1000,
    })
    .status(200)
    .json({
      message: "You have logged in :D",
    });
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.body.jwt;
    // console.log(req.body.jwt);
    await axios
      .get("userinfo", {
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then((data) => {
        const userName = data.data.name.split(" ").join("").toLowerCase();
        db.getConnection((err: QueryError, conn: PoolConnection) => {
          const sql = `INSERT INTO tb_user (user_name, user_email, user_username ) VALUES (?,?, ? )`;
          const values = [data.data.name, data.data.email, userName];
          conn.query<ResultSetHeader>(sql, values, async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(500)
                .send({ message: "Register gagal, silahkan coba lagi" });
            } else {
              conn.release();
              // console.log(result);
              if (result.affectedRows !== 0) {
                res
                  .status(200)
                  .send({ message: "Register Berhasil silahkan login" });
              } else {
                res
                  .status(500)
                  .send({ message: "Register gagal, silahkan coba lagi" });
              }
            }
          });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: "Register gagal, silahkan coba lagi" });
      });
  }
);

router.get("/test", isAuth, (req: Request, res: Response) => {
  res.send("mantap");
  //   console.log("mantap");
});

router.post(
  "/google-login",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.body.jwt;

    await axios
      .get("userinfo", {
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then((data) => {
        // const userName = data.data.name.split(" ").join("").toLowerCase();
        db.getConnection((err: QueryError, conn: PoolConnection) => {
          const sql = `SELECT * FROM tb_user WHERE user_email = ?;`;
          const values = [data.data.email];
          conn.query<RowDataPacket[]>(sql, values, async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(500)
                .send({ message: "Login gagal, silahkan coba lagi" });
            }
            conn.release();
            // console.log(result);
            if (result.length !== 0) {
              const accessTokens = await accessToken({
                id: result[0].id,
                user_name: result[0].user_name,
                user_email: result[0].user_email,
                user_username: result[0].user_username,
              });
              res.cookie("access", accessTokens, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
                domain: "localhost",
                // maxAge: 30 * 1000,
              });
              // console.log("berhasil");
              return res.status(200).send({
                id: result[0].id,
                user_name: result[0].user_name,
                user_email: result[0].user_email,
                user_username: result[0].user_username,
              });
            } else {
              res.status(500).send({
                message: "Login gagal!!!, coba cek kembali email anda",
              });
            }
          });
        });
      })
      .catch((err) => {
        return res.send(err);
      });
  }
);
router.post("/signout", (req: Request, res: Response) => {
  res.clearCookie("access", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: "localhost",
  });
  // const cookies = req.cookies;
  // console.log(cookies.access);
  res.end();
});

router.get("/checkAuth", isAuth, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ message: "Session Expired" });
  }
  return res.send(req.user);
});
router.get("/checkUser", (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    if (err) {
      conn.release();
      conn.rollback(function () {
        res.status(400).send({
          message: "Terjadi Error, silahkan refresh coba lagi",
        });
      });
    }

    const sql = `SELECT COUNT(*) AS Row FROM tb_user`;
    // DELETE FROM table LIMIT 1
    // DELETE FROM table WHERE id=(SELECT id FROM table ORDER BY XXXX ASC LIMIT 1) LIMIT 1
    // SELECT * FROM tb_testimoni ORDER BY testimoni_id ASC LIMIT 1;
    conn.query<RowDataPacket[]>(sql, function (err, result) {
      if (err) {
        conn.release();
        res.status(400).send({
          message: "Terjadi Error, silahkan refresh coba lagi",
        });
      }
      if (result[0].Row >= 2) {
        if (err) {
          conn.release();
          conn.rollback(function () {
            res.status(400).send({
              message: "Terjadi Error, silahkan refresh coba lagi",
            });
          });
        }

        conn.release();
        return res
          .status(401)
          .send({ message: "Anda sudah terdaftar silahkan login" });
      } else {
        conn.release();
        return res.status(201).send({ message: "" });
      }
    });
  });
});

export default router;
