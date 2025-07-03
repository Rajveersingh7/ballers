const Joi = require("joi");

const cardValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    position: Joi.string()
      .valid("ST", "LW", "RW", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK")
      .required(),
    pace: Joi.number().integer().min(1).max(99).required(),
    dribbling: Joi.number().integer().min(1).max(99).required(),
    shooting: Joi.number().integer().min(1).max(99).required(),
    defending: Joi.number().integer().min(1).max(99).required(),
    passing: Joi.number().integer().min(1).max(99).required(),
    physicality: Joi.number().integer().min(1).max(99).required(),
    overall: Joi.number().integer().min(1).max(99).required()
  });

  const {error} = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({message: "Bad request", error: error.details[0].message});
  }
  next();
};

module.exports = cardValidation;
