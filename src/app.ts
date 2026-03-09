import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index.js';
import { ErrorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:4000', //I know, this is bad practice, but i don´t know the fornt url
    credentials: true
}));

app.use(express.json());

app.use(cookieParser())

app.use('/api/v1', mainRouter);

app.use(ErrorHandler.jsonSyntxError);

export default app;