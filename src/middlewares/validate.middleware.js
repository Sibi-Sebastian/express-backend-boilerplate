import { AppError } from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      req.body = validatedData.body;
      req.params = validatedData.params;
      req.query = validatedData.query;

      next();
    } catch (error) {
      const message = error.errors?.map(e => e.message).join(", ") || "Validation error";
      next(new AppError(message, 400));
    }
  };
};


export default validate;
