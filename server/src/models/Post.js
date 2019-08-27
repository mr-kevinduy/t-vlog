import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { servicesConfig } from '../config';

const schema = new mongoose.Schema({
  title: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  content: String,
  image: String
}, { timestamps: true });

export default mongoose.model('Post', schema);

