import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { clientConfig, servicesConfig } from '../config';

const schema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: [true, "this username is exist."],
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  // bio: String,
  // image: String,
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hash: String,
  salt: String,
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: String, default: '' }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

schema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${clientConfig.host}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateJWT = function generateJWT() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, servicesConfig.api.authSecret);
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
}

export default mongoose.model('User', schema);
