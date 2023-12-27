import http from 'http';
import app from './app';
import { connectDB } from '../config/db/connect';

const PORT = process.env.PORT || 4000;
const httpServer = http.createServer(app);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    httpServer.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log('db error', error);
  }
};

start();

