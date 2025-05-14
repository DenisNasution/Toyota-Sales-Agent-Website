import express, { Response, Request } from "express";
import {
  PoolConnection,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import {
  multerUploadMiddlewareVehicle,
  multerUploadMiddlewareTestimoni,
} from "../middleware/imgUploadMiddleware";
import { resizeImagesVehicle } from "../middleware/imgUploadSharp";
import fs from "fs";
import { isAuth } from "../middleware/utils";
const db = require("../db/db_config");

const router = express.Router();

// "SELECT * FROM tb_subvehicle t1 INNER JOIN tb_vehicle ON t1.subvehicle_idVehicle = tb_vehicle.vehicle_id INNER JOIN tb_category ON t1.subvehicle_idCategory = tb_category.category_id INNER JOIN ( SELECT subVehicle_idVehicle, MIN(subVehicle_price) AS min_val2 FROM tb_subvehicle GROUP BY subVehicle_idVehicle) t2 ON t1.subVehicle_idVehicle = t2.subVehicle_idVehicle AND t1.subVehicle_price  = t2.min_val2 ",
router.get("/", isAuth, (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<RowDataPacket[]>(
      "SELECT * FROM tb_vehicle INNER JOIN tb_category ON tb_category.category_id = tb_vehicle.vehicle_idCategory",
      (err, result) => {
        conn.release();
        if (result.length !== 0) {
          res.status(200).send(result);
          // return res.status(404).send({ message: "Data Not Found" });
        } else {
          return res.status(404).send({ message: "Data Tidak Tersedia" });
        }
      }
    );
  });
});
router.get("/:id", (req: Request, res: Response) => {
  const vehicle_id = req.params.id;
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<[]>(
      `SELECT * FROM tb_vehicle WHERE vehicle_id = ${vehicle_id}`,
      (err, result) => {
        if (err) {
          conn.release();
          conn.rollback(function () {
            res.status(400).send({
              message: "Terjadi Error, silahkan refresh coba lagi",
            });
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
          conn.release();
          return res.status(200).send(result);
          db.end();
        });
      }
    );
  });
});
router.get("/category", (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<RowDataPacket[]>("SELECT * FROM tb_category", (err, result) => {
      conn.release();
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        return res.status(400).send({ message: "Data Not Found" });
      }
    });
  });
});

// router.get("/test", (req: Request, res: Response) => {
//   const data = [
//     {
//       vehicle_id: "1",
//       vehicle_name: "Alphard",
//       vehicle_idCategory: "1",
//       subVehicle_id: "1",
//       subVehicle_name: "2.5 G A/T",
//       subVehicle_price: "1000000000",
//       subVehicle_idVehicle: "1",
//       subVehicle_idCategory: "1",
//       category_id: "1",
//       category_name: "MPV",
//     },
//     {
//       vehicle_id: "1",
//       vehicle_name: "Alphard",
//       vehicle_idCategory: "1",
//       subVehicle_id: "2",
//       subVehicle_name: "2.5 G A/T",
//       subVehicle_price: "2000000000",
//       subVehicle_idVehicle: "1",
//       subVehicle_idCategory: "1",
//       category_id: "1",
//       category_name: "MPV",
//     },
//     {
//       vehicle_id: "2",
//       vehicle_name: "Innova Zenix",
//       vehicle_idCategory: "1",
//       subVehicle_id: "3",
//       subVehicle_name: "Zenix 2.0 G CVT NPC",
//       subVehicle_price: "423000000",
//       subVehicle_idVehicle: "2",
//       subVehicle_idCategory: "1",
//       category_id: "1",
//       category_name: "MPV",
//     },
//     {
//       vehicle_id: "2",
//       vehicle_name: "Innova Zenix",
//       vehicle_idCategory: "1",
//       subVehicle_id: "4",
//       subVehicle_name: "Zenix 2.0 G CVT PC",
//       subVehicle_price: "419000000",
//       subVehicle_idVehicle: "2",
//       subVehicle_idCategory: "1",
//       category_id: "1",
//       category_name: "MPV",
//     },
//     {
//       vehicle_id: "2",
//       vehicle_name: "Innova Zenix",
//       vehicle_idCategory: "1",
//       subVehicle_id: "5",
//       subVehicle_name: "Zenix 2.0 G CVT PCg",
//       subVehicle_price: "422000000",
//       subVehicle_idVehicle: "2",
//       subVehicle_idCategory: "1",
//       category_id: "1",
//       category_name: "MPV",
//     },
//   ];
//   type dataTest = {
//     vehicle_id: string;
//     vehicle_name: string;
//     vehicle_idCategory: string;
//     subVehicle_id: string;
//     subVehicle_name: string;
//     subVehicle_price: string;
//     subVehicle_idVehicle: string;
//     subVehicle_idCategory: string;
//     category_id: string;
//     category_name: string;
//   };
//   const datatest = [0];
//   // vehicle_id: "",
//   // vehicle_name: "",
//   // subVehicle_id: "",
//   // subVehicle_name: "",
//   // subVehicle_price: "",
//   // category_id: "",
//   // category_name: "",

//   // const vehid: number[] = [0];

//   //   if(!vehid.includes(data[0].vehicle_id)){
//   //     vehid.push(data[i].vehicle_id)
//   //   }

//   // for (let i = 0; i < data.length; i++) {
//   //   for (let j = 0; j < vehid.length; j++) {
//   //     if (data[0].vehicle_id) {
//   //       const element = array[j];
//   //       const element = array[i];
//   //     }
//   //   }

//   // }
//   // for (let i = 0; i < data.length; i++) {
//   //   if (datatest.length === 0) {
//   //     datatest.push(data[0]);
//   //   } else {
//   for (let index = 0; index < datatest.length; index++) {
//     if (datatest[index] === index) {
//       datatest.push(index);
//       console.log(datatest);
//     }
//     // datatest.push(index);
//     // if (data[i].vehicle_id !== datatest[index].vehicle_id) {
//     //   datatest.push(data[i]);
//     //   console.log(datatest.length);
//     // console.log(data[i].vehicle_id, datatest[index].vehicle_id);
//   }
//   // return;
//   // else {
//   //   if (data[i].subVehicle_price < datatest[index].subVehicle_price) {
//   //     datatest[index].subVehicle_price = data[i].subVehicle_price;
//   //   }
//   // }
//   // }
//   //   }
//   // }
//   // res.send(datatest);
// });

router.get("/:id/vehicle/vehicletype", (req: Request, res: Response) => {
  const vehicle_id = req.params.id;
  // interface subVehicle {
  //   subVehicle_id: number;
  //   subVehicle_name: string;
  //   subVehicle_price: string;
  //   subVehicle_idVehicle: number;
  //   subVehicle_idCategory: number;
  //   vehicle_id: number;
  //   vehicle_name: string;
  //   vehicle_idCategory: number;
  //   vehicle_banner: string;
  //   vehicle_img: string;
  // }
  type Vehicle = {
    vehicleId: string;
    vehicleName: string;
    vehicleImage: string;
    vehicleBanner: string;
    vehicle: RowDataPacket[];
  };
  let dataVehicle: Vehicle = {
    vehicleId: "",
    vehicleName: "",
    vehicleImage: "",
    vehicleBanner: "",
    vehicle: [],
  };

  db.getConnection((err: QueryError, conn: PoolConnection) => {
    // conn.beginTransaction(function (err) {
    if (err) {
      conn.release();
      res
        .status(400)
        .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
    }
    // conn.query<RowDataPacket[]>(
    //   `SELECT * FROM tb_vehicle WHERE vehicle_id = ${vehicle_id}`,
    //   (err, result) => {
    // if (err) {
    //   conn.release();
    //   conn.rollback(function () {
    //     res.status(400).send({
    //       message: "Terjadi Error, silahkan refresh coba lagi",
    //     });
    //   });
    // }

    conn.query<RowDataPacket[]>(
      `SELECT * FROM tb_subvehicle INNER JOIN tb_vehicle ON tb_subvehicle.subvehicle_idVehicle = tb_vehicle.vehicle_id WHERE vehicle_id = ${vehicle_id}`,
      (err, result) => {
        // console.log(result);
        if (err) {
          conn.release();
          // conn.rollback(function () {
          res.status(400).send({
            message: "Terjadi Error, silahkan refresh coba lagi",
          });
          // });
        }

        conn.release();
        if (result.length !== 0) {
          dataVehicle.vehicleId = result[0].vehicle_id;
          dataVehicle.vehicleName = result[0].vehicle_name;
          dataVehicle.vehicleImage = result[0].vehicle_img;
          dataVehicle.vehicleBanner = result[0].vehicle_banner;
          dataVehicle.vehicle = result;
          // conn.commit(function (err) {
          // if (err) {
          //   conn.release();
          //   conn.rollback(function () {
          //     res.status(400).send({
          //       message: "Terjadi Error, silahkan refresh coba lagi",
          //     });
          //   });
          // }
          res.status(200).send(dataVehicle);
          // });
        } else {
          res.status(404).send({ message: "Data Tidak Tersedia" });
        }
        // db.end();
      }
    );
    // }
    // );
    // });
  });
});
router.get("/:id/vehicletype", isAuth, (req: Request, res: Response) => {
  const subVehicle_id = req.params.id;
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query<[]>(
      `SELECT * FROM tb_subvehicle WHERE subVehicle_id = ${subVehicle_id}`,
      (err, result) => {
        if (err) {
          conn.release();
          conn.rollback(function () {
            res.status(400).send({
              message: "Terjadi Error, silahkan refresh coba lagi",
            });
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
          conn.release();
          return res.status(200).send(result);
          db.end();
        });
      }
    );
  });
});

router.post(
  "/addvehicle",
  isAuth,
  multerUploadMiddlewareVehicle,
  resizeImagesVehicle,
  (req: Request, res: Response) => {
    const vehicle_name: string = req.body.vehicle_name;
    const vehicle_idCategory: number = parseInt(req.body.vehicle_idCategory);
    const images = req.files as { [fieldname: string]: Express.Multer.File[] };
    // console.log(vehicle_name);
    // console.log(vehicle_idCategory);
    // console.log(images);
    // const bannerLocation = `/images/${req.body.images[0]["banner"]}`;
    // const imgLocation = `/images/${req.body.images[1]["image"]}`;
    // const vehicle_name: string = "Fortuner";
    // const vehicle_idCategory: number = 2;
    if (images) {
      let bannerLocation = "";
      let imgLocation = "";
      for (let i = 0; i < Object.keys(req.body.images).length; i++) {
        if (Object.keys(req.body.images[i])[0] == "banner") {
          bannerLocation = `/images/${req.body.images[i]["banner"]}`;
        } else if (Object.keys(req.body.images[i])[0] === "image") {
          imgLocation = `/images/${req.body.images[i]["image"]}`;
        }
      }
      db.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.beginTransaction(function (err) {
          if (err) {
            conn.release();
            res
              .status(400)
              .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
          }
          const sql = `INSERT INTO tb_vehicle(vehicle_name, vehicle_idCategory, vehicle_banner, vehicle_img) VALUES (?,?,?,?)`;
          const values = [
            vehicle_name,
            vehicle_idCategory,
            bannerLocation,
            imgLocation,
          ];
          conn.query<ResultSetHeader>(sql, values, function (err, result) {
            if (err) {
              conn.release();
              conn.rollback(function () {
                res.status(400).send({
                  message: "Terjadi Error, silahkan refresh coba lagi",
                });
              });
            }
            console.log(result.insertId);
            const sql = `INSERT INTO tb_subvehicle(subVehicle_name, subVehicle_price, subVehicle_idVehicle ) VALUES (?,?,?)`;
            const values = ["Gsx", "300000000", result.insertId];
            conn.query(sql, values, function (err, result) {
              if (err) {
                conn.release();
                conn.rollback(function () {
                  res.status(400).send({
                    message: "Terjadi Error, silahkan refresh coba lagi",
                  });
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
                conn.release();
                res
                  .status(200)
                  .send({ message: "vehicle created successfully" });
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

router.post("/addvehicletype", isAuth, (req: Request, res: Response) => {
  const subVehicle_name: string = req.body.subVehicle_name;
  const subVehicle_price: string = req.body.subVehicle_price;
  const subVehicle_idVehicle: string = req.body.subVehicle_idVehicle;
  // const vehicle_idCategory: number = req.body.vehicle_idCategory;
  // const subVehicle_price: string = "605800000";
  // const subVehicle_idVehicle: number = 3;
  // const subVehicle_idCategory: number = 2;
  // console.log(subVehicle_name, subVehicle_price, subVehicle_idVehicle);
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.beginTransaction(function (err) {
      if (err) {
        conn.release();
        res
          .status(400)
          .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
      }
      const sql = `INSERT INTO tb_subvehicle(subVehicle_name, subVehicle_price, subVehicle_idVehicle ) VALUES (?,?,?)`;
      const values = [subVehicle_name, subVehicle_price, subVehicle_idVehicle];
      conn.query(sql, values, function (err, result) {
        if (err) {
          conn.release();
          conn.rollback(function () {
            res.status(400).send({
              message: "Terjadi Error, silahkan refresh coba lagi",
            });
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
          conn.release();
          res.status(200).send({ message: "subvehicle created successfully" });
        });
      });
    });
  });
});

router.put(
  "/:id/vehicle",
  isAuth,
  multerUploadMiddlewareVehicle,
  resizeImagesVehicle,
  async (req, res) => {
    const vehicle_name = req.body.vehicle_name;
    const vehicle_idCategory = req.body.vehicle_idCategory;
    let vehicle_banner = req.body.vehicle_banner;
    let vehicle_img = req.body.vehicle_img;

    const vehicle_id = req.params.id;
    const imgs = req.files as Express.Multer.File[];
    console.log(Object.keys(imgs).length);
    // if (Object.keys(imgs).length > 1) {
    //   console.log("");
    // } else {
    //   if (Object.keys(req.body.images[0])[0] === "banner") {
    //     vehicle_banner = req.body.images[0]["banner"];
    //   } else if (Object.keys(req.body.images[0])[0] === "image") {
    //     vehicle_img = req.body.images[0]["image"];
    //   }
    //   console.log("banner:", vehicle_banner);
    //   console.log("image:", vehicle_img);
    //   console.log(req.body.images[0]);
    // }

    if (Object.keys(imgs).length !== 0) {
      let bannerLocation = "";
      let imgLocation = "";
      if (Object.keys(imgs).length > 1) {
        for (let i = 0; i < Object.keys(req.body.images).length; i++) {
          if (Object.keys(req.body.images[i])[0] == "banner") {
            bannerLocation = `/images/${req.body.images[i]["banner"]}`;
          } else if (Object.keys(req.body.images[i])[0] === "image") {
            imgLocation = `/images/${req.body.images[i]["image"]}`;
          }
        }
        // const sql = `UPDATE tb_vehicle SET vehicle_name = ?, vehicle_idCategory = ?, vehicle_banner = ?, vehicle_img = ? WHERE vehicle_id= ?`;
        // await db.getConnection(
        //   async (err: QueryError, conn: PoolConnection) => {
        //     await conn.execute<ResultSetHeader>(
        //       sql,
        //       [
        //         vehicle_name,
        //         vehicle_idCategory,
        //         bannerLocation,
        //         imgLocation,
        //         vehicle_id,
        //       ],
        //       async (err, result) => {
        //         if (err) throw err;
        //         conn.release();

        //         if (result.affectedRows !== 0) {
        //           fs.unlinkSync(`public${vehicle_banner}`);
        //           fs.unlinkSync(`public${vehicle_img}`);
        //           return res.status(200).send({
        //             vehicleId: vehicle_id,
        //             message: "vehicle updated successfully",
        //           });
        //         } else {
        //           fs.unlinkSync(`public${bannerLocation}`);
        //           fs.unlinkSync(`public${imgLocation}`);
        //           return res.status(400).send({ message: "Data Not Found" });
        //         }
        //       }
        //     );
        //   }
        // );
      } else {
        if (Object.keys(req.body.images[0])[0] === "banner") {
          bannerLocation = `/images/${req.body.images[0]["banner"]}`;
          // console.log(bannerLocation);
          // const sql = `UPDATE tb_vehicle SET vehicle_name = ?, vehicle_idCategory = ?, vehicle_banner = ?, vehicle_img = ? WHERE vehicle_id= ?`;
          // await db.getConnection(
          //   async (err: QueryError, conn: PoolConnection) => {
          //     await conn.execute<ResultSetHeader>(
          //       sql,
          //       [
          //         vehicle_name,
          //         vehicle_idCategory,
          //         bannerLocation,
          //         vehicle_img,
          //         vehicle_id,
          //       ],
          //       async (err, result) => {
          //         if (err) throw err;
          //         conn.release();
          //         if (result.affectedRows !== 0) {
          //           fs.unlinkSync(`public${vehicle_banner}`);
          //           return res.status(200).send({
          //             vehicleId: vehicle_id,
          //             message: "vehicle updated successfully",
          //           });
          //         } else {
          //           fs.unlinkSync(`public${bannerLocation}`);
          //           return res.status(400).send({ message: "Data Not Found" });
          //         }
          //       }
          //     );
          //   }
          // );
        } else if (Object.keys(req.body.images[0])[0] === "image") {
          imgLocation = `/images/${req.body.images[0]["image"]}`;
          // const sql = `UPDATE tb_vehicle SET vehicle_name = ?, vehicle_idCategory = ?, vehicle_banner = ?, vehicle_img = ? WHERE vehicle_id= ?`;
          // await db.getConnection(
          //   async (err: QueryError, conn: PoolConnection) => {
          //     await conn.execute<ResultSetHeader>(
          //       sql,
          //       [
          //         vehicle_name,
          //         vehicle_idCategory,
          //         vehicle_banner,
          //         imgLocation,
          //         vehicle_id,
          //       ],
          //       async (err, result) => {
          //         if (err) throw err;
          //         conn.release();

          //         if (result.affectedRows !== 0) {
          //           fs.unlinkSync(`public${vehicle_img}`);
          //           return res.status(200).send({
          //             vehicleId: vehicle_id,
          //             message: "vehicle updated successfully",
          //           });
          //         } else {
          //           fs.unlinkSync(`public${imgLocation}`);
          //           return res.status(400).send({ message: "Data Not Found" });
          //         }
          //       }
          //     );
          //   }
          // );
        }
      }
      // console.log("banner", bannerLocation);
      // console.log("image", imgLocation);
      const values = [
        vehicle_name,
        vehicle_idCategory,
        bannerLocation == "" ? vehicle_banner : bannerLocation,
        imgLocation == "" ? vehicle_img : imgLocation,
        vehicle_id,
      ];
      const sql = `UPDATE tb_vehicle SET vehicle_name = ?, vehicle_idCategory = ?, vehicle_banner = ?, vehicle_img = ? WHERE vehicle_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          values,
          async (err, result) => {
            if (err) {
              conn.release();
              res
                .status(400)
                .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
            }
            conn.release();

            if (result.affectedRows !== 0) {
              if (bannerLocation === "") {
                fs.unlinkSync(`public${vehicle_img}`);
              } else if (imgLocation === "") {
                fs.unlinkSync(`public${vehicle_banner}`);
              } else {
                fs.unlinkSync(`public${vehicle_banner}`);
                fs.unlinkSync(`public${vehicle_img}`);
              }
              return res.status(200).send({
                vehicleId: vehicle_id,
                message: "vehicle updated successfully",
              });
            } else {
              fs.unlinkSync(`public${bannerLocation}`);
              fs.unlinkSync(`public${imgLocation}`);
              return res.status(400).send({ message: "Data Not Found" });
            }
          }
        );
      });
    } else {
      const sql = `UPDATE tb_vehicle SET vehicle_name = ?, vehicle_idCategory = ?, vehicle_banner = ?, vehicle_img = ? WHERE vehicle_id= ?`;
      await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
        await conn.execute<ResultSetHeader>(
          sql,
          [
            vehicle_name,
            vehicle_idCategory,
            vehicle_banner,
            vehicle_img,
            vehicle_id,
          ],
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
                vehicleId: vehicle_id,
                message: "vehicle updated successfully",
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
router.put("/:id/vehicletype", isAuth, async (req: Request, res: Response) => {
  const subVehicle_name = req.body.subVehicle_name;
  const subVehicle_price = req.body.subVehicle_price;
  let subVehicle_idVehicle = req.body.subVehicle_idVehicle;
  // const subVehicle_idCategory = req.body.subvehicle_idCategory;
  // let subVehicle_idVehicle = 1;
  // const subVehicle_idCategory = 1;
  const subVehicle_id = req.params.id;
  // console.log(subVehicle_name);
  // console.log(subVehicle_price);

  const sql = `UPDATE tb_subvehicle SET subVehicle_name = ?, subVehicle_price = ?, subVehicle_idVehicle = ? WHERE subVehicle_id = ?`;
  const values = [
    subVehicle_name,
    subVehicle_price,
    subVehicle_idVehicle,
    subVehicle_id,
  ];
  await db.getConnection(async (err: QueryError, conn: PoolConnection) => {
    await conn.execute<ResultSetHeader>(
      sql,
      [subVehicle_name, subVehicle_price, subVehicle_idVehicle, subVehicle_id],
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
            subVehicleId: subVehicle_id,
            message: "subVehicle updated successfully",
          });
        } else {
          return res.status(400).send({ message: "Data Not Found" });
        }
        // });
      }
    );
    // });
  });
});

router.delete("/:id", isAuth, (req: Request, res: Response) => {
  // console.log(req.body);
  const banner: string = req.body.banner;
  const image: string = req.body.image;
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.beginTransaction(function (err) {
      if (err) {
        conn.release();
        res
          .status(400)
          .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
      }
      const sql = `DELETE FROM tb_subvehicle  WHERE subVehicle_idVehicle = ?`;
      const values = [req.params.id];
      conn.query<ResultSetHeader>(sql, values, async (err, result) => {
        if (err) {
          conn.release();
          conn.rollback(function () {
            res.status(400).send({
              message: "Terjadi Error, silahkan refresh coba lagi",
            });
          });
        }
        if (result.affectedRows !== 0) {
          const sql = `DELETE FROM tb_vehicle  WHERE vehicle_id = ?`;
          conn.query<ResultSetHeader>(sql, values, async (err, result) => {
            if (err) {
              conn.release();
              conn.rollback(function () {
                res.status(400).send({
                  message: "Terjadi Error, silahkan refresh coba lagi",
                });
              });
            }
            conn.release();
            if (result) {
              fs.unlinkSync(`public${banner}`);
              fs.unlinkSync(`public${image}`);
              conn.commit(function (err) {
                if (err) {
                  conn.release();
                  conn.rollback(function () {
                    res.status(400).send({
                      message: "Terjadi Error, silahkan refresh coba lagi",
                    });
                  });
                }
                res
                  .status(200)
                  .send({ message: "vehicle deleted successfully" });
              });
            }
            // else {
            //   res.status(200).send({ message: "vehicle deleted successfully" });
            // }
          });
        } else {
          // console.log(result);
          const sql = `DELETE FROM tb_vehicle  WHERE vehicle_id = ?`;
          conn.query<ResultSetHeader>(sql, values, async (err, result) => {
            if (err) {
              conn.release();
              conn.rollback(function () {
                res.status(400).send({
                  message: "Terjadi Error, silahkan refresh coba lagi",
                });
              });
            }
            conn.release();
            if (result.affectedRows !== 0) {
              fs.unlinkSync(`public${banner}`);
              fs.unlinkSync(`public${image}`);
              conn.commit(function (err) {
                if (err) {
                  conn.release();
                  conn.rollback(function () {
                    res.status(400).send({
                      message: "Terjadi Error, silahkan refresh coba lagi",
                    });
                  });
                }
                res
                  .status(200)
                  .send({ message: "vehicle deleted successfully" });
              });
            } else {
              res.status(400).send({ message: "Data Not Found" });
            }
          });
        }
      });
    });
    // const sql = `DELETE tb_subvehicle, tb_vehicle FROM tb_subvehicle JOIN tb_vehicle ON tb_vehicle.vehicle_id = tb_subvehicle.subVehicle_idVehicle WHERE tb_subvehicle.subVehicle_idVehicle = ?`;
    // const values = [req.params.id];
    // conn.query(sql, values, async (err, result) => {
    //   if (err) throw err;
    //   conn.release();
    //   if (result) {
    //     // fs.unlinkSync(`public${banner}`);
    //     // fs.unlinkSync(`public${image}`);
    //     await res.status(200).send("vehicle deleted successfully");
    //   } else {
    //     res.status(400).send({ message: "Data Not Found" });
    //   }
    // });
  });
});

router.delete("/:id/vehicleType", isAuth, (req: Request, res: Response) => {
  db.getConnection((err: QueryError, conn: PoolConnection) => {
    const sql = `DELETE FROM tb_subvehicle WHERE subVehicle_id = ?`;
    const values = [req.params.id];
    conn.query(sql, values, async (err, result) => {
      if (err) {
        conn.release();
        res
          .status(400)
          .send({ message: "Terjadi Error, silahkan refresh coba lagi" });
      }
      conn.release();
      if (result) {
        await res
          .status(200)
          .send({ message: "subvehicle deleted successfully" });
      } else {
        res.status(400).send({ message: "Data Not Found" });
      }
    });
  });
});

export default router;
