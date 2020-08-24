const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.changeStatusOfTaskDone = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
    },
    {
      $set: {
        status: 'Done',
      },
    },
    { new: true }
  );

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

exports.changeStatusOfSubtaskToDo = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      'subtask._id': req.params.subtaskId,
    },
    {
      $set: {
        'subtask.$.status': 'To Do',
      },
    },
    { new: true }
  );

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

exports.changeStatusOfSubtaskInProgress = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      'subtask._id': req.params.subtaskId,
    },
    {
      $set: {
        'subtask.$.status': 'In Progress',
      },
    },
    { new: true }
  );

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

exports.changeStatusOfSubtaskQA = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      'subtask._id': req.params.subtaskId,
    },
    {
      $set: {
        'subtask.$.status': 'QA',
      },
    },
    { new: true }
  );

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

exports.changeStatusOfSubtaskDone = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      'subtask._id': req.params.subtaskId,
    },
    {
      $set: {
        'subtask.$.status': 'Done',
      },
    },
    { new: true }
  );

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});
