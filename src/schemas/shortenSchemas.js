import joi from "joi";

const shortenSchema = joi.object({
  url: joi.string().required().min(3).max(100),
});

export default shortenSchema;