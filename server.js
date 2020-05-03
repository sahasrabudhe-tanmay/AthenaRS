const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const verifyToken = require('./util/authentication').verifyJWT;

mongoose.connect('mongodb://localhost:27017/athenadb').catch(err => {
    throw err;
});
mongoose.connection.on('error', err => {
    throw err;
});

app.use(cors());
app.use(express.json());
app.use('/user', require('./routes/userRouter'));
app.use('/tasks', verifyToken, require('./routes/tasksRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ', PORT));