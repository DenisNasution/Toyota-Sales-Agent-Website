import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const updateResizeImagesVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.file);
  if (!req.files) return next();
  const images = req.files as { [fieldname: string]: Express.Multer.File[] };

  req.body.images = [];
  await Promise.all(
    Object.keys(images).map(async (key) => {
      sharp.cache(false);
      await sharp(images[key][0].path)
        .png({ quality: 90 })
        .toFile(path.resolve("public", "images", images[key][0].filename));

      fs.unlinkSync(images[key][0].path);

      req.body.images.push({
        [images[key][0].fieldname]: images[key][0].filename,
      });
    })
  );
  next();
};

const updateResizeImagesBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  const images = req.file as Express.Multer.File;
  req.body.images = "";
  // console.log(typeof images["path"]);
  sharp.cache(false);
  await sharp(images["path"])
    .jpeg({ quality: 90 })
    .toFile(path.resolve("public", "banners", images["filename"]));
  // .then((response) => fs.unlinkSync(images["path"]));
  fs.unlinkSync(req.file.path);
  req.body.images = images["filename"];
  next();
};
const updateResizeImagesTestimoni = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  const images = req.file as Express.Multer.File;

  req.body.images = "";
  // console.log(typeof images["path"]);
  sharp.cache(false);
  await sharp(images["path"])
    .jpeg({ quality: 90 })
    .toFile(path.resolve("public", "testimoni", images["filename"]));
  // .then((response) => fs.unlinkSync(images["path"]));
  fs.unlinkSync(req.file.path);
  req.body.images = images["filename"];
  next();
};

export {
  updateResizeImagesVehicle,
  updateResizeImagesBanner,
  updateResizeImagesTestimoni,
};
