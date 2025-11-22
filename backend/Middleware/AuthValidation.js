import joi from "joi";

export const signupValidtion = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export const loginValidtion = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};
