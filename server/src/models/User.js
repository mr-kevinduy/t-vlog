import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { servicesConfig } from '../config';

const schema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  image: String,
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hash: String,
  salt: String
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = () => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, servicesConfig.api.authSecret);
}

export default mongoose.model('User', schema);
