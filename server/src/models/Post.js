import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    validate: [
      {
        validator: v => (v.length <= 200),
        message: props => `Invalid: "${props.value}" is too large, please fill title <= 200 chars)`
      },
      {
        validator: v => (v !== 'kevin'),
        message: props => `Invalid: "${props.value}"" is private, please choose other title.`
      }
    ],
    index: true
  },
  content: String,
  image: String
}, { timestamps: true });

export default mongoose.model('Post', schema);

