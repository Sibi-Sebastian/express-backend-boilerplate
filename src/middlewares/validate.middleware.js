import { AppError } from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      const message = result.error.issues
        .map(issue => issue.message)
        .join(", ");

      return next(new AppError(message, 400));
    }

    req.body = result.data.body;
    req.params = result.data.params;
    req.query = result.data.query;

    next();
  };
};

export default validate;