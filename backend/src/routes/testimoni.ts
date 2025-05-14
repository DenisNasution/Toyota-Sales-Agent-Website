import express, { Response, Request } from "express";
import {
  PoolConnection,
  QueryError,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import {
  multerUploadMiddlewareBanner,
  multerUploadMiddlewareTestimoni,
} from "../middleware/imgUploadMiddleware";
import fs from "fs";
import {
  resizeImagesBanner,
  resizeImagesTestimoni,
} from "../middleware/imgUploadSharp";
import { isAuth } from "../middleware/utils";
const db = require("../db/db_config");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<RowDataPacket[]>(
      "SELECT * FROM tb_testimoni ",
      (err, result) => {
        conn.release();
        if (result.length !== 0) {
          res.status(200).send(result);
        } else {
          return res.status(404).send({ message: "Data Tidak Tersedia" });
        }
      }
    );
  });
});
router.get("/latest", isAuth, (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<RowDataPacket[]>(
      "SELECT * FROM tb_testimoni ORDER BY testimoni_id DESC LIMIT 3 ",
      (err, result) => {
        conn.release();
        if (result.length !== 0) {
          res.status(200).send(result);
        } else {
          return res.status(404).send({ message: "Data Tidak Tersedia" });
        }
      }
    );
  });
});

router.post(
  "/",
  isAuth,
  multerUploadMiddlewareTestimoni,
  resizeImagesTestimoni,
  (req: Request, res: Response) => {
    const testimoni_text: string = req.body.testimoni_text;
    console.log(testimoni_text);
    const image = req.file as Express.Multer.File;
    const testimoni_img_location = `/testimoni/${req.body.images}`;
    if (image) {
      db.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.beginTransaction(function (err) {
          if (err) {
            conn.release();
            res
              .status(400)
              .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
          }
          const sql = `INSERT INTO tb_testimoni(testimoni_text, testimoni_img) VALUES (?,?)`;
          const values = [testimoni_text, testimoni_img_location];
          conn.query(sql, values, function (err, result) {
            if (err) {
              conn.release();
              conn.rollback(function () {
                res.status(400).send({
                  message: "Terjadi Error, silahkan refresh coba lagi",
                });
              });
            }

            const sql = `SELECT COUNT(*) AS Row FROM tb_testimoni`;
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
              conn.commit(function (err) {
                if (err) {
                  conn.release();
                  conn.rollback(function () {
                    res.status(400).send({
                      message: "Terjadi Error, silahkan refresh coba lagi",
                    });
                  });
                }
                if (result[0].Row > 27) {
                  const sql = `SELECT * FROM tb_testimoni ORDER BY testimoni_id ASC LIMIT 1`;
                  conn.query<RowDataPacket[]>(sql, function (err, result) {
                    if (err) {
                      conn.release();
                      conn.rollback(function () {
                        res.status(400).send({
                          message: "Terjadi Error, silahkan refresh coba lagi",
                        });
                      });
                    }
                    const image = result[0].testimoni_img;
                    if (result.length !== 0) {
                      const sql = `DELETE FROM tb_testimoni LIMIT 1`;
                      conn.query<ResultSetHeader>(sql, function (err, result) {
                        if (err) {
                          conn.release();
                          res.status(400).send({
                            message:
                              "Terjadi Error, silahkan refresh coba lagi",
                          });
                        }

                        fs.unlinkSync(`public${image}`);
                        conn.release();
                        return res
                          .status(200)
                          .send({ message: "testimoni created successfully" });
                      });
                    }
                  });
                } else {
                  conn.release();
                  return res
                    .status(200)
                    .send({ message: "testimoni created successfully" });
                }
              });
            });
          });
        });
      });
    } else {
      res.status(400).send({
        message: "Error!, silahkan refresh dan coba lagi",
      });
    }
  }
);

router.post(
  "/test",
  multerUploadMiddlewareTestimoni,
  resizeImagesTestimoni,
  (req: Request, res: Response) => {
    // res.send("oke");
    // console.log(req.body.images);
    db.getConnection((err: QueryError, conn: PoolConnection) => {
      const sql = `INSERT INTO tb_test(base) VALUES (?)`;
      const values = [req.body.images];
      conn.query(sql, values, function (err, result) {
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
          .status(200)
          .send({ message: "testimoni created successfully" });
      });
    });
    const testimoni_text: string = req.body.testimoni_text;
    console.log(testimoni_text);
    const image = req.file as Express.Multer.File;
    const testimoni_img_location = `/testimoni/${req.body.images}`;
    if (image) {
      // db.getConnection((err: QueryError, conn: PoolConnection) => {
      //   conn.beginTransaction(function (err) {
      //     if (err) {
      //       conn.release();
      //       res
      //         .status(400)
      //         .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
      //     }
      //     const sql = `INSERT INTO tb_testimoni(testimoni_text, testimoni_img) VALUES (?,?)`;
      //     const values = [testimoni_text, testimoni_img_location];
      //     conn.query(sql, values, function (err, result) {
      //       if (err) {
      //         conn.release();
      //         conn.rollback(function () {
      //           res.status(400).send({
      //             message: "Terjadi Error, silahkan refresh coba lagi",
      //           });
      //         });
      //       }

      //       const sql = `SELECT COUNT(*) AS Row FROM tb_testimoni`;
      //       // DELETE FROM table LIMIT 1
      //       // DELETE FROM table WHERE id=(SELECT id FROM table ORDER BY XXXX ASC LIMIT 1) LIMIT 1
      //       // SELECT * FROM tb_testimoni ORDER BY testimoni_id ASC LIMIT 1;
      //       conn.query<RowDataPacket[]>(sql, function (err, result) {
      //         if (err) {
      //           conn.release();
      //           res.status(400).send({
      //             message: "Terjadi Error, silahkan refresh coba lagi",
      //           });
      //         }
      //         conn.commit(function (err) {
      //           if (err) {
      //             conn.release();
      //             conn.rollback(function () {
      //               res.status(400).send({
      //                 message: "Terjadi Error, silahkan refresh coba lagi",
      //               });
      //             });
      //           }
      //           if (result[0].Row > 27) {
      //             const sql = `SELECT * FROM tb_testimoni ORDER BY testimoni_id ASC LIMIT 1`;
      //             conn.query<RowDataPacket[]>(sql, function (err, result) {
      //               if (err) {
      //                 conn.release();
      //                 conn.rollback(function () {
      //                   res.status(400).send({
      //                     message: "Terjadi Error, silahkan refresh coba lagi",
      //                   });
      //                 });
      //               }
      //               const image = result[0].testimoni_img;
      //               if (result.length !== 0) {
      //                 const sql = `DELETE FROM tb_testimoni LIMIT 1`;
      //                 conn.query<ResultSetHeader>(sql, function (err, result) {
      //                   if (err) {
      //                     conn.release();
      //                     res.status(400).send({
      //                       message:
      //                         "Terjadi Error, silahkan refresh coba lagi",
      //                     });
      //                   }

      //                   fs.unlinkSync(`public${image}`);
      //                   conn.release();
      //                   return res
      //                     .status(200)
      //                     .send({ message: "testimoni created successfully" });
      //                 });
      //               }
      //             });
      //           } else {
      //             conn.release();
      //             return res
      //               .status(200)
      //               .send({ message: "testimoni created successfully" });
      //           }
      //         });
      //       });
      //     });
      //   });
      // });
      res.send("berhasil upload");
    } else {
      res.status(400).send({
        message: "Error!, silahkan refresh dan coba lagi",
      });
    }
  }
);
router.put(
  "/",
  isAuth,
  multerUploadMiddlewareTestimoni,
  resizeImagesTestimoni,
  async (req: Request, res: Response) => {
    const testimoni_text: string = req.body.testimoni_text;
    const testimoni_img = req.body.testimoni_img;
    const image = req.file as Express.Multer.File;
    // const testimoni_text: string = "test1";
    // const testimoni_img = "/testimoni/upload-1716564382216.jpg";

    const testimoni_id = req.body.testimoni_id;
    // console.log(testimoni_id, testimoni_img, testimoni_text);
    console.log(image);

    if (image) {
      const testimoni_img_location = `/testimoni/${req.body.images}`;

      const sql = `UPDATE tb_testimoni SET testimoni_text = ?, testimoni_img = ? WHERE testimoni_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          [testimoni_text, testimoni_img_location, testimoni_id],
          async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(400)
                .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
            }
            conn.release();

            if (result.affectedRows !== 0) {
              fs.unlinkSync(`public${testimoni_img}`);
              return res.status(200).send({
                testimoniId: testimoni_id,
                message: "testimoni updated successfully",
              });
            } else {
              fs.unlinkSync(`public${testimoni_img_location}`);
              return res.status(400).send({ message: "Data Not Found" });
            }
          }
        );
      });
    } else {
      const sql = `UPDATE tb_testimoni SET testimoni_text = ?, testimoni_img = ? WHERE testimoni_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          [testimoni_text, testimoni_img, testimoni_id],
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
                testimoniId: testimoni_id,
                message: "testimoni updated successfully",
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
  //   req.body.images = "public\\temp\\upload-1716387151078.jpg";
  console.log(req.body);
  const images = req.body.images;
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    const sql = `DELETE FROM tb_testimoni WHERE testimoni_id = ?`;
    const values = [req.body.id];
    conn.query<ResultSetHeader>(sql, values, async (err, result) => {
      if (err) {
        conn.release();
        res
          .status(400)
          .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
      }
      conn.release();
      console.log(result);
      if (result.affectedRows !== 0) {
        fs.unlinkSync(`public${images}`);
        await res.status(200).send({ message: "recipe deleted successfully" });
      } else {
        res.status(400).send({ message: "Data Not Found" });
      }
    });
  });
});

export default router;
