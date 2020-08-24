const express = require('express');

const taskController = require('../controllers/taskController');
const changeStatus = require('../controllers/changeStatus');

const router = express.Router();

// 1.) GET ALL  AND CREATE PARENT TASKS
router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

// 2.) GET, UPDATE, DELETE PARENT TASKS
router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

// 3.)  CREATE, GET, UPDATE, DELETE SUBTASKS
router.route('/:taskId/:subtaskId').get(taskController.getSubtask);
router.route('/:taskId/createSubtask').post(taskController.createSubtask);
// router.route('/:subtaskId').get(taskController.getSubtask);
router.route('/:taskId/:subtaskId').patch(taskController.updateSubtask);
router.route('/:taskId/:subtaskId').delete(taskController.deleteSubtask);

// 4.) CHANGE STATUS OF TASK "To Do", "IN PROGRESS", "QA", "DONE"
router
  .route('/:taskId/changeStatus')
  .patch(changeStatus.changeStatusOfTaskDone);
// 5.) CHANGE STATUS OF SUBTASKS FOR "To Do", "IN PROGRESS", "QA", "DONE"
router
  .route('/:taskId/:subtaskId/changeStatustodo')
  .patch(changeStatus.changeStatusOfSubtaskToDo);

router
  .route('/:taskId/:subtaskId/changeStatusInProgress')
  .patch(changeStatus.changeStatusOfSubtaskInProgress);

router
  .route('/:taskId/:subtaskId/changeStatusQA')
  .patch(changeStatus.changeStatusOfSubtaskQA);

router
  .route('/:taskId/:subtaskId/changeStatusDone')
  .patch(changeStatus.changeStatusOfSubtaskDone);

module.exports = router;
