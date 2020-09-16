import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// Routes
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';
import searchRoutes from './routes/api/search';

const app = express();
const { MONGO_URI } = config;

const prod = process.env.NODE_ENV === 'production'; // build

app.use(hpp()); //
app.use(helmet()); // 서버보안 보완

app.use(cors({ origin: true, credentials: true })); // 다른 포트요청 허용
app.use(morgan('dev')); // 개발시 log 볼수 있음

/* https replace
if(prod) {
  app.use(
    cors({
      origin: ["https://ssaple.com", /\.ssaple\.com$/],
      credentials : true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin:true,
      credentials : true,
    })
  );
}
*/

app.use(express.json()); // json 형태로 해석

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Cluster connecting Success!!'))
  .catch((e) => console.log(e));

/* --- // https
app.all("*",(req,res,next) => {
  let protocol = req.headers["x-forward-proto"] || req.protocol;
  if(protocol === "https") {
    next();
  } else {
    let to = `https://$(req.hostname}${req.url}`;
    res.redirect(to);
  }
});
*/

// Use routes
//app.get('/');                     // Home !
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

// build case
/*
if (prod) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
*/

export default app;
