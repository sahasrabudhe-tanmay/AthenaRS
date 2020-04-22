const express = require('express');
const app = express();

app.use(express.json());
app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ', PORT));

