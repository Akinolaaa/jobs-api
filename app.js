require('dotenv').config();
require('express-async-errors');
// extra security packages
const helmet = require('helmet'); 
// helmet sets various http headers to prevent numerous attacks
const cors = require('cors'); //Cross Origin Resource Sharing
// cors ensures api is accessible from different domains
const xss =  require('xss-clean');
// sanitizes user input in {req:{body, query, params}} and protects from cross side scripting attacks where the attacker try to inject some malicious code
const rateLimiter = require('express-rate-limit');
// limit the amount of requests the user can make  

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect');
// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// Authentication middleware
const authenticateUser = require('./middleware/authentication');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowsMS: 15 * 60 * 1000, // 15minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('jobs-api')
})

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


// extra packages

// errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log('db error', error);
  }
};

start();
