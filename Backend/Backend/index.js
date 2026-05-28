const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
const apiRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const app = express();
const port = process.env.PORT || 3000;


connectDB();

app.use(express.json());

app.use('/v1/auth', apiRoutes);
app.use('/v1/user', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
