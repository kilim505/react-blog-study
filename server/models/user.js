import mongoose from 'mongoose';
import moment from 'moment';

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 중복 금지
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['MainJuin', 'SubJuin', 'User'],
    default: 'User',
  },
  register_date: {
    type: Date,
    default: moment().format('YYYY-MM-DD hh:mm:ss'), // 한국시간으로
  },
  comments: [
    // 여러 개 의미 - 연관성
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
      },
    },
  ],
  posts: [
    // 여러 개 이므로 배열
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
  ],
});

const User = mongoose.model('user', UserSchema);

export default User;
