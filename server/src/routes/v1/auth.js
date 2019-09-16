import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import authMiddleware from '../../middlewares/auth';
import User from '../../models/User';
import parseErrors from '../../utils/parseErrors';
import { sendConfirmationEmail } from '../../functions/mailer';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/register', (req, res, next) => {
  const { username, email, password, fullname } = req.body.user;

  const user = new User({
    username,
    email
  });

  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(user => {
      // sendConfirmationEmail(user);
      return res.json({ payload: user.toAuthJSON()});
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
});

router.post('/login', (req, res, next) => {
  const { username, email, password } = req.body.user;

  if (!email) return res.status(422).json({ errors: { email: "can't be blank" } });
  if (!password) return res.status(422).json({ errors: { password: "can't be blank" } });

  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err) return next(err);

    if (user) {
      user.token = user.generateJWT();
      return res.json({ payload: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/confirmation', (req, res) => {
  const { token } = req.body;

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(user => user ? res.json({ payload: user.toAuthJSON() }) : res.status(400).json({}));
});

router.post('/reset_password', (req, res) => {

});

router.post('/validate_token', (req, res) => {

});

export default router;
