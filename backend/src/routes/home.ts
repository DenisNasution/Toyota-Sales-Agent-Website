import express, { Response, Request } from "express";
import {
  PoolConnection,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import fs from "fs";
const db = require("../db/db_config");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  interface vehicle {
    subVehicle_id: number;
    subVehicle_name: string;
    subVehicle_price: string;
    subVehicle_idVehicle: number;
    subVehicle_idCategory: number;
    vehicle_id: number;
    vehicle_name: string;
    vehicle_idCategory: number;
    vehicle_banner: string;
    vehicle_img: string;
    category_id: number;
    category_name: string;
    min_val2: string;
  }
  // const vehicle: vehicle[] = [];

  interface banner {
    banner_id: number;
    banner_img: string;
  }

  // const banner: banner[] = [];

  interface testimoniInterface {
    testimoni_id: number;
    testimoni_text: string;
    testimoni_img: string;
  }
  // const testimoni: testimoni[] = [];
  interface home {
    testimoni: testimoniInterface[];
    banner: banner[];
    vehicle: vehicle[];
  }
  const home: home = {
    banner: [],
    vehicle: [],
    testimoni: [],
  };

  db.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.beginTransaction(function (err) {
      if (err) {
        throw err;
      }
      conn.query<[]>(`SELECT * FROM tb_banner `, (err, result) => {
        if (err) {
          conn.rollback(function () {
            throw err;
          });
        }
        home.banner = result;

        conn.query<[]>(
          "SELECT * FROM tb_subvehicle t1 INNER JOIN tb_vehicle ON t1.subvehicle_idVehicle = tb_vehicle.vehicle_id INNER JOIN ( SELECT subVehicle_idVehicle, MIN(subVehicle_price) AS min_val2 FROM tb_subvehicle GROUP BY subVehicle_idVehicle) t2 ON t1.subVehicle_idVehicle = t2.subVehicle_idVehicle AND t1.subVehicle_price  = t2.min_val2 ",
          (err, result) => {
            if (err) {
              conn.rollback(function () {
                throw err;
              });
            }
            home.vehicle = result;
            conn.query<[]>(
              "SELECT * FROM tb_testimoni ORDER BY testimoni_id DESC LIMIT 2",
              (err, result) => {
                if (err) {
                  conn.rollback(function () {
                    throw err;
                  });
                }
                home.testimoni = result;
                conn.commit(function (err) {
                  if (err) {
                    conn.rollback(function () {
                      throw err;
                    });
                  }
                  conn.release();
                  return res.send(home);
                  db.end();
                });
              }
            );
          }
        );
      });
    });
    // conn.query<RowDataPacket[]>(
    //   "SELECT * FROM tb_subvehicle t1 INNER JOIN tb_vehicle ON t1.subvehicle_idVehicle = tb_vehicle.vehicle_id INNER JOIN tb_category ON t1.subvehicle_idCategory = tb_category.category_id INNER JOIN ( SELECT subVehicle_idVehicle, MIN(subVehicle_price) AS min_val2 FROM tb_subvehicle GROUP BY subVehicle_idVehicle) t2 ON t1.subVehicle_idVehicle = t2.subVehicle_idVehicle AND t1.subVehicle_price  = t2.min_val2 ",
    //   (err, result) => {
    //     conn.release();
    //     if (result.length !== 0) {
    //       res.status(500).send(result);
    //     } else {
    //       return res.status(400).send({ message: "Data Not Found" });
    //     }
    //   }
    // );
  });
});

export default router;
