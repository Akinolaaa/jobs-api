import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet'; 
import rateLimiter from 'express-rate-limit';
import authRouter from './routes/auth.route';
import jobsRouter from './routes/job.route';

const app = express();

// error handler
import notFoundMiddleware from './middleware/not-found.middleware';
import errorHandlerMiddleware from './middleware/error-handler.middleware';

// Swagger
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml')


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Jobs API</h1> <a href="/api-docs">Documentation</a>')
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);


// extra packages

// errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


export default app;
