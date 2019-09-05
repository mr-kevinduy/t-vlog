import mongoose from 'mongoose';

const schema = mongoose.Schema({
  type: String,
  avatar: String,
  firstName: String,
  lastName: String,
  nickname: String,
  bio: String,
  social: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  following: [{ type: mongoose.Schema.Types.OjectId, ref: 'Profile'}]
}, { timestamps: true });

export default mongoose.model('Profile', schema);
