import _ from 'lodash';
import { check } from 'express-validator';

const validate = (validates = []) => {
  let result = [];

  Object.keys(validates).forEach(key => {
    result.push(check(key).custom((value, { req, res, next }) => {
      const errors = {};

      validates[key].map(valid => {
        // console.log(valid);
        if (!valid.validator(req.body.payload[key])) {
          console.log('Message: ', valid.message);
          errors[key] = { message: valid.message };
          // throw new Error(valid.message);
        }
      });

      // return next(errors);

      if (!_.isEmpty(errors)) {
        console.log('Error!.');
        res.status(400).json({ errors: parseErrors(errors) });

        return next(errors);
      }
    }));
  });

  return result;
}

export default validate;
