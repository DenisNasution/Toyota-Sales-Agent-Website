import { createCustomError } from "../error/customErrors";

export function tryCatchWrapper(func: any) {
  return async (req: any, res: any, next: any) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(createCustomError(error, 400));
    }
  };
}
