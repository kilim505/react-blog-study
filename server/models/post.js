import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, // 검색창에서 사용
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    // 조회수
    type: Number,
    default: -2,
  },
  fileUrl: {
    // 그림 파일 주소 -> 대체 필요
    type: String,
    default: 'https://source.unsplash.com/random/301x201',
  },
  date: {
    type: String,
    default: moment().format('YYYY-MM-DD hh:mm:ss'),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category', // 카테고리와 연결
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  creator: {
    // 작성자
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Post = mongoose.model('post', PostSchema);

export default Post;
