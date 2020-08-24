const express = require('express');
const taskRouter = require('./routes/taskRoutes');
// const subTaskRouter = require('./routes/subTaskRoutes');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/task', taskRouter);
// app.use('/api/v1/task/:id/subtask', subTaskRouter);

module.exports = app;
