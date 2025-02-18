import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routers/index.router.ts';

const corsOptions = {
  origin: process.env.FRONT_URL,
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

export default app;
