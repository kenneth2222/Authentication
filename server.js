const express = require('express');
require('dotenv').config();
require('./config/database');
const PORT = process.env.PORT;
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const categoryRouter = require('./routes/categoryRouter');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(categoryRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});