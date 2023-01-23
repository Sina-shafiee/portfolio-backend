const express = require('express');
const router = express.Router();

const protected = require('../middleware/auth');
const {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject
} = require('../controller/project');

router.route('/').get(getProjects).post(protected, addProject);
router
  .route('/:id')
  .get(getProject)
  .patch(protected, updateProject)
  .delete(protected, deleteProject);

module.exports = router;
