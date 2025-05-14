import express, { NextFunction, Request, Response } from "express";
import {
  QueryError,
  PoolConnection,
  RowDataPacket,
  ResultSetHeader,
} from "mysql2";
import multer, { MulterError } from "multer";
import "dotenv/config";
import vehicleRoutes from "./routes/vehicle";
import testimoniRoutes from "./routes/testimoni";
import bannerRoutes from "./routes/banner";
import homeRoutes from "./routes/home";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import {
  multerUploadMiddlewareVehicle,
  multerUploadMiddlewareTestimoni,
} from "./middleware/imgUploadMiddleware";
import {
  resizeImagesVehicle,
  resizeImagesTestimoni,
} from "./middleware/imgUploadSharp";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import userRouter from "./routes/user";
const db = require("./db/db_config");
import "./middleware/passport";
import "./services/googleStrategy";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(path.resolve("./public")));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-no-retry"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
const allowedOrigins = [
  "http://localhost:3000",
  "https://toyotakotamedan.com",
  "https://www.toyotakotamedan.com",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-no-retry",
};

app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     // origin: "http://127.0.0.1:5500",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//     allowedHeaders:
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-no-retry",
//   })
// );

// app.use("/api/vehicle", vehicleRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/user", userRouter);
app.use("/api/testimoni", testimoniRoutes);

app.get(
  "/",
  // multerUploadMiddlewareVehicle,
  // resizeImagesVehicle,
  async (req: Request, res: Response) => {
    // const images = req.file as Express.Multer.File;
    const user_name = "kopi nyaman";
    const user_email = "kopinyaman_masdfsdadn@gmail.com";
    const user_username = "konyam";
    const user_password = "konyam";
    // const text = req.body;

    // req.body.images = [];
    // await Promise.all(
    //   Object.keys(images).map(async (key) => {
    //     await sharp(images[key][0].path)
    //       .jpeg({ quality: 90 })
    //       .toFile(path.resolve("public", "images", images[key][0].filename));

    //     req.body.images.push({
    //       [images[key][0].fieldname]: images[key][0].filename,
    //     });
    //   })
    // );
    // Object.keys(images).map(function (key, index) {
    //   console.log(images[key][0].filename);
    // });
    // fs.unlinkSync(images["path"]);
    // console.log(images["path"]);
    // console.log(req.body.images);
    // db.getConnection((err: QueryError, conn: PoolConnection) => {
    //   conn.beginTransaction(function (err) {
    //     if (err) {
    //       throw err;
    //     }
    //     const sql = `SELECT user_email from tb_user WHERE user_email = ?`;
    //     const values = [user_email];
    //     conn.query<ResultSetHeader>(sql, values, function (err, result) {
    //       if (err) {
    //         conn.rollback(function () {
    //           throw err;
    //         });
    //       }

    //       conn.commit(function (err) {
    //         if (err) {
    //           conn.rollback(function () {
    //             throw err;
    //           });
    //         }
    //         conn.release();
    //         console.log(result);
    //         res.send({ message: "user created successfully" });
    //       });
    //     });
    //   });
    // });
    res.send(
      "<button><a href='/api/user/register'>Login With Google</a></button>"
    );
  }
);

app.get("/test", (req: Request, res: Response) => {
  res.send("berhasil");
  // const profile = "dnisnast@gmail.com";
  // // let resultArray: any[] = [];
  // const result = [
  //   {
  //     id: 1,
  //     user_name: "denis",
  //     user_email: "dnisnast@gmail.com",
  //     user_username: "denisnast",
  //   },
  // ];
  // // resultArray.push(result[0]);
  // // res.send(resultArray);
  // try {
  // let resultArray: any[] = [];
  // db.getConnection((err: QueryError, conn: PoolConnection) => {
  //   conn.query<[]>(
  //     `SELECT * FROM tb_user WHERE user_email = '${profile}'`,
  //     (err, result) => {
  //       if (err) throw err;
  //       if (result.length !== 0) {
  //         // return res.send("oke");
  //         return done(null, result);
  //         console.log(result);
  //         resultArray = result;
  //       }
  //     }
  //   );
  // });
  // res.send(resultArray);
  // } catch (err) {
  //   console.log(err);
  // }

  // try {
  //   // db.getConnection((err: QueryError, conn: PoolConnection) => {
  //   //   conn.beginTransaction(function (err) {
  //   //     if (err) {
  //   //       throw err;
  //   //     }
  //   //     const sql = `INSERT INTO tb_user(user_name, user_email, user_username ) VALUES (?,?,?)`;
  //   //     const values = [
  //   //       profile.displayName,
  //   //       profile.email,
  //   //       profile.displayName,
  //   //     ];
  //   //     conn.query(sql, values, function (err, result) {
  //   //       if (err) {
  //   //         conn.rollback(function () {
  //   //           throw err;
  //   //         });
  //   //       }

  //   //       conn.commit(function (err) {
  //   //         if (err) {
  //   //           conn.rollback(function () {
  //   //             throw err;
  //   //           });
  //   //         }
  //   //         conn.release();
  //   //         const dataProfile = {
  //   //           user_name: profile.displayName,
  //   //           user_email: profile.email,
  //   //           user_username: profile.displayName,
  //   //         };
  //   //         done(null, dataProfile);
  //   //       });
  //   //     });
  //   //   });
  //   // });
  //   console.log("baru");
  // } catch (err) {
  //   console.log(err);
  // }
});

db.getConnection((err: QueryError) => {
  if (err) throw err;
  console.log("database connected");
});
// db.getConnection((err: QueryError) => {});
app.listen();
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
