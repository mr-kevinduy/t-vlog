import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Logger from '../../middlewares/logger';
import Auth from '../../middlewares/auth';
import User from '../../models/User';
import parseErrors from '../../utils/parseErrors';
import { sendConfirmationEmail } from '../../functions/mailer';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/register', (req, res, next) => {
  const { username, email, password, repeatPassword, fullname } = req.body.user;
  const errors = {};

  if (!username) errors['username'] = "can't be blank";
  if (!email) errors['email'] = "can't be blank";
  if (!password) errors['password'] = "can't be blank";
  if (!repeatPassword) {
    errors['repeatPassword'] = "can't be blank";
  } else if (password !== repeatPassword) {
    errors['repeatPassword'] = "Must same password.";
  }

  if (
    !username ||
    !email ||
    !password ||
    !repeatPassword ||
    password !== repeatPassword
  ) return res.status(422).json({
    status: 0,
    code: 422,
    message: "Parameter not true format",
    errors
  });

  const user = new User({
    username,
    email
  });

  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(user => {
      sendConfirmationEmail(user);
      return res.json({
        status: 1,
        payload: user.toAuthJSON()
      });
    })
    .catch(err => {
      Logger.error(`<System> Save to database error. Detail: ${JSON.stringify(parseErrors(err.errors))}`);

      return res.status(404).json({
        status: 0,
        code: 404,
        message: "Save to database error.",
        errors: parseErrors(err.errors)
      });
    });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body.user;
  const errors = {};

  if (!email) errors['email'] = "can't be blank";
  if (!password) errors['password'] = "can't be blank";

  if (!email || !password) return res.status(422).json({
    status: 0,
    code: 422,
    message: "Parameter not true format",
    errors
  });

  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err) return next(err);

    if (user) {
      user.token = user.generateJWT();

      return res.json({
        status: 1,
        payload: user.toAuthJSON()
      });
    } else {
      return res.status(422).json({
        status: 0,
        code: 422,
        message: "Passport authenticate error.",
        errors: info.errors
      });
    }
  })(req, res, next);
});

router.post('/confirmation', (req, res) => {
  const { token } = req.body;
  const errors = {};

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(user => {
    if (!user) {
      return res.status(400).json({
        status: 0,
        code: 400,
        message: "Not found user.",
        errors
      });
    }

    return res.json({
      status: 1,
      payload: user.toAuthJSON()
    });
  });
});

router.post('/reset_password', (req, res) => {

});

router.post('/validate_token', (req, res) => {

});

export default router;
