import express from 'express';

import router from './routers/index.router';

const app = express();

app.use(express.json());

app.use(router);

export default app;
