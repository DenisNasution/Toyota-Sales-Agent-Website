import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const accessToken = (user: any) => {
  // console.log({
  //     "userInfo": {
  //         "userName": user.userName,
  //         "nameOfUser": user.nameOfUser
  //     }
  // })
  return jwt.sign(
    {
      userInfo: {
        id: user.id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_username: user.user_username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);
  // console.log(authHeader?.startsWith('Bearer '))

  //   if (!authHeader?.startsWith("Bearer "))
  //     return res.status(401).send({ message: "Please login" });
  //   const accessToken = authHeader.split(" ")[1];
  const cookies = req.cookies;
  // console.log("cookies", cookies.access);
  if (!cookies.access) return res.status(401).send({ message: "Please login" });
  const accessToken = cookies.access;
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decode: any) => {
      if (err)
        return res
          .status(401)
          .send({ message: "Session anda habis silahkan login" }); //invalid token
      req.user = decode.userInfo;
      next();
    }
  );
};
export { accessToken, isAuth };
