import passportLocal from 'passport-local';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

// Passport configs
const LocalStrategy = passportLocal.Strategy;

const passportMiddleware = new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({ email: email }).then(function(user) {
    if (!user || !user.isValidPassword(password)) {
      return done(null, false, { errors: parseErrors({ 'auth.error': { message: 'email or password is invalid' } }) });
    }

    return done(null, user);
  }).catch(done);
});

export default passportMiddleware;
