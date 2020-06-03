import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import passport from './middlewares/passport';
import { apiRoutes, authRoutes } from './routes';
import StreamSvc from './services/StreamSvc';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(logger('dev'));
app.use(passport.initialize());

/*
* Routes
* */
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: 'WTF maaan 😎',
  });
});

/*
* Init Server
* */
(async () => {
  const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
  } = process.env;

  const uri = `mongodb://${DB_USER ? `${DB_USER}:${DB_PASSWORD || ''}@` : ''}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const port = process.env.PORT || 9000;
  const host = process.env.HOST || 'localhost';
  const server = app.listen(port, () => console.log(`Server is listening at http://${host}:${port}`));

  StreamSvc.initSocket(server);
})();
