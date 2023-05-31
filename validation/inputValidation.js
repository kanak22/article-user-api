const Joi = require('joi');

const userValidation = (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: error.details[0].message,
      message: "Bad request",
    });
  }

  next();
}

const articleValidation = (req, res, next) => {

  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().required().min(10).max(2000),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: error.details[0].message,
      message: "Bad request",
    });
  }

  next();
}

module.exports = {
  userValidation,
  articleValidation
};