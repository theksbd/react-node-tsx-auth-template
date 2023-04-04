import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions';
import credentialsMiddleware from './middleware/credentialsMiddeware';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';

dotenv.config();
const app: Express = express();

// Middleware
app.use(credentialsMiddleware);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World from server.ts' });
});

// Middleware
app.use(notFoundMiddleware);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
