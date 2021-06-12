import Joi from 'joi';

const email = Joi.string().email().required();
const username = Joi.string().alphanum().min(3).max(30).required()

const message = 'must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character';


