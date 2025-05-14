import express, { NextFunction, Request, Response } from "express";
import path from "path";
import multer, { MulterError } from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/temp");
  },
  filename(req, file, cb) {
    cb(null, `upload-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error("Invalid IMAGE type"));
  },
});

const multerUploadMiddlewareVehicle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const makeMulterUploadMiddleware = upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]);
  return makeMulterUploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(403).send({
        error: "FILE UPLOAD ERROR",
        message: `Something wrong ocurred when trying to upload please refresh and try again`,
      });
      return res.send(err);
    } else if (err && err.name && err.name === "Error") {
      return res.status(500).send({
        error: err.name,
        message: `${err.message}`,
      });
    }
    next();
  });
};

const multerUploadMiddlewareBanner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const makeMulterUploadMiddleware = upload.single("banner");
  return makeMulterUploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(403).send({
        error: "FILE UPLOAD ERROR",
        message: `Something wrong ocurred when trying to upload please refresh and try again`,
      });
      return res.send(err);
    } else if (err && err.name && err.name === "Error") {
      return res.status(500).send({
        error: err.name,
        message: `${err.message}`,
      });
    }
    next();
  });
};
const multerUploadMiddlewareTestimoni = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const makeMulterUploadMiddleware = upload.single("imgTes");
  return makeMulterUploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(403).send({
        error: "FILE UPLOAD ERROR",
        message: `Something wrong ocurred when trying to upload please refresh and try again`,
      });
      return res.send(err);
    } else if (err && err.name && err.name === "Error") {
      return res.status(500).send({
        error: err.name,
        message: `${err.message}`,
      });
    }
    next();
  });
};

export {
  multerUploadMiddlewareVehicle,
  multerUploadMiddlewareTestimoni,
  multerUploadMiddlewareBanner,
};
