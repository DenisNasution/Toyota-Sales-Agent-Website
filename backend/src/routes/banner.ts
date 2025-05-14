import express, { Response, Request } from "express";
import {
  PoolConnection,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import fs from "fs";
import { multerUploadMiddlewareBanner } from "../middleware/imgUploadMiddleware";
import { resizeImagesBanner } from "../middleware/imgUploadSharp";
import { isAuth } from "../middleware/utils";
import { Multer } from "multer";
const db = require("../db/db_config");

const router = express.Router();

router.get("/", isAuth, (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<RowDataPacket[]>("SELECT * FROM tb_banner", (err, result) => {
      conn.release();
      res.send(result);
      // if (result) {
      //   res.status(500).send(result);
      // } else {
      //   return res.status(400).send({ message: "Data Not Found" });
      // }
    });
  });
});
router.put(
  "/",
  isAuth,
  multerUploadMiddlewareBanner,
  resizeImagesBanner,
  async (req, res) => {
    const banner_id = req.body.banner_id;
    let banner_img = req.body.banner_img;
    const banner_default = `/default/banner.png`;

    const image = req.file as Express.Multer.File;

    if (image) {
      const banner_img_location = `/banners/${req.body.images}`;

      const sql = `UPDATE tb_banner SET banner_img = ? WHERE banner_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          [banner_img_location, banner_id],
          async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(400)
                .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
            }
            conn.release();

            if (result.affectedRows !== 0) {
              if (banner_img !== banner_default) {
                fs.unlinkSync(`public${banner_img}`);
              }
              return res.status(200).send({
                bannerId: banner_id,
                message: "banner updated successfully",
              });
            } else {
              fs.unlinkSync(`public${banner_img_location}`);
              return res.status(400).send({ message: "Data Not Found" });
            }
          }
        );
      });
    } else {
      const sql = `UPDATE tb_banner SET banner_img = ? WHERE banner_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          [banner_img, banner_id],
          async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(400)
                .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
            }
            conn.release();

            if (result.affectedRows !== 0) {
              return res.status(200).send({
                bannerId: banner_id,
                message: "banner updated successfully",
              });
            } else {
              return res.status(400).send({ message: "Data Not Found" });
            }
          }
        );
      });
    }
  }
);
router.delete("/", isAuth, (req: Request, res: Response) => {
  const id = req.body.id;
  const banner = req.body.banner;
  const banner_default = `/default/banner.png`;

  // console.log(id);
  if (banner === `/default/banner.png`) {
    res.status(500).send({ message: "Banner tidak dapat di hapus" });
  } else {
    db.getConnection((err: QueryError, conn: PoolConnection) => {
      const sql = `UPDATE tb_banner SET banner_img = ? WHERE banner_id= ?`;
      conn.query<ResultSetHeader>(sql, [banner_default, id], (err, result) => {
        conn.release();
        if (result.affectedRows !== 0) {
          fs.unlinkSync(`public${banner}`);
          res.status(200).send({ message: "Banner berhasil di hapus" });
        } else {
          return res.status(400).send({ message: "Data Not Found" });
        }
      });
    });
  }
});

export default router;
