const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

const apiRoutes = require('./src/routes/api');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();


app.use('/v1/api', apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
5