const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const Task = require('../models/taskModel');
const Subtask = require('../');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const ticketNumber = Math.floor(Math.random() * 100);

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create({
    issueType: req.body.issueType,
    summary: req.body.summary,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  });
  res.status(201).json({
    status: 'success',
    data: { task },
  });
});

exports.getAllTasks = factory.getAll(Task);
exports.getTask = factory.getOne(Task);
exports.deleteTask = factory.deleteOne(Task);
exports.updateTask = factory.updateOne(Task);

// CREATE SUBTASK

exports.createSubtask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    { _id: req.params.taskId },
    {
      $push: {
        subtask: req.body,
      },
    }
  );

  res.status(201).json({
    status: 'success',
    data: { task },
  });
});

// UPDATE SUBTASK
exports.updateSubtask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      'subtask._id': req.params.subtaskId,
    },
    {
      $set: {
        'subtask.$': req.body,
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

// DELETE SUBTASK

exports.deleteSubtask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
    },
    { $pull: { subtask: { _id: req.params.subtaskId } } },
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

// Get SUBTASK

exports.getSubtask = catchAsync(async (req, res, next) => {
  const task = await Task.aggregate([
    {
      $unwind: '$subtask',
    },
    {
      $match: { 'subtask._id': ObjectId(req.params.subtaskId) },
    },
    {
      $project: {
        _id: 0,
        summary: '$subtask.summary',
        description: '$subtask.summary',
        status: '$subtask.status',
        priority: '$subtask.priority',
        assignee: '$subtask.assignee',
        reporter: '$subtask.reporter',
        order: '$subtask.order',
      },
    },
  ]);

  if (!task) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});
