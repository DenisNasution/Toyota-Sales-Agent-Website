import passport from "passport";
import passportJwt from "passport-jwt";
const JWTStrategy = passportJwt.Strategy;

const secret: string = process.env.JWT_SECRET as string;

const cookieExtractor = (req: any) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done("Unauthorized", false);
      }

      done(null, jwtPayload);
    }
  )
);
