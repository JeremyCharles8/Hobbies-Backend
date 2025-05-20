import Joi from 'joi';

export default Joi.object({
  title: Joi.string()
    .required()
    .messages({ 'any.required': 'Title input is required' }),
});
