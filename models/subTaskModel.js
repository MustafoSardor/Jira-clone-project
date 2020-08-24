const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const subTaskSchema = new Schema([
  {
    summary: { type: String, required: [true, 'Summary is required'] },
    description: String,
    id: 'String',
    status: {
      type: String,
      default: 'To Do',
      enum: ['To Do', 'In Progress', 'QA', 'DONE'],
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
    // attachments: [{ data: Buffer, contentType: String }],
    reporter: {
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      // default: 'Not assigned',
      type: String,
    },
    order: Number,
  },
]);

const SubTask = mongoose.model('Subtask', subTaskSchema);

module.exports = SubTask;
