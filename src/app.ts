import express from 'express';
import { ErrorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json);

app.use(ErrorHandler.jsonSyntxError);

export default app;