const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Subtask = require('./subTaskModel');

const { Schema } = mongoose;

const taskSchema = new Schema({
  issueType: {
    type: String,
    required: true,
    enum: {
      values: ['STORY', 'TASK', 'SUBTASK', 'BUG', 'EPIC', 'SPIKE'],
      message:
        'Issue type accepts only: STORY, TASK, SUBTASK, BUG, EPIC, SPIKE',
    },
  },
  summary: { type: String, required: [true, 'Summary required'] },
  description: String,
  status: {
    type: String,
    default: 'To Do',
    enum: ['To Do', 'QA', 'DONE'],
    required: true,
  },
  priority: {
    type: String,
    default: 'Medium',
    enum: {
      values: ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
      message: 'Priority accepts only: Highest, High, Medium, Low, Lowest',
    },
  },
  assignee: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // default: 'Not assigned',
    type: String,
  },
  attachments: [{ data: Buffer, contentType: String }],
  reporter: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // default: 'Not assigned',
    type: String,
  },
  project: {
    // type: Schema.Types.ObjectId,
    // ref: 'Project',
    type: String,
  },

  // Generate random unique number
  order: Number,
  subtask: [
е
  ],
});

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subtask',
  });
  next();
});

taskSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'order' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
