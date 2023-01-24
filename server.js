require('colors');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const customError = require('./utils/customError');
const connectDB = require('./db/connectDB');

const projectRouter = require('./routes/project');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRouter);
app.use('/api/auth', userRouter);
app.use('*', customError);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MANGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
