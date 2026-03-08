import express from 'express';
import mainRouter from './routes/index.js';
import { ErrorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(ErrorHandler.jsonSyntxError);

export default app;