const Project = require('../model/project');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');

/**
 * @desc get all projects
 * @endpoint GET /api/projects
 * @access Public
 */
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})
    .select('title image technologies tags')
    .sort({ createdAt: -1 });

  res.status(200).json({ projects });
});

/**
 * @desc add project
 * @endpoint POST /api/projects
 * @access Private
 */
const addProject = asyncHandler(async (req, res) => {
  const {
    title,
    bio,
    desc,
    imageBlob,
    technologies,
    isCompleted,
    tags,
    links
  } = req.body;

  const uploadImageRes = await cloudinary.uploader.upload(imageBlob, {
    height: 800,
    width: 1300,
    crop: 'fill'
  });

  const image = {
    img_id: uploadImageRes.public_id,
    img_url: uploadImageRes.secure_url
  };

  const project = await Project.create({
    title,
    bio,
    desc,
    image,
    links,
    technologies,
    tags,
    isCompleted
  });

  res.status(200).json({ project });
});

/**
 * @desc get single project by id
 * @endpoint GET /api/projects/:id
 * @access Public
 */
const getProject = asyncHandler(async (req, res) => {
  const { id: projectID } = req.params;

  const project = await Project.findById(projectID);

  if (!project) {
    res.status(404);
    throw new Error('Project detail not found');
  }

  res.status(200).json({ project });
});

/**
 * @desc update project by id
 * @endpoint PATCH /api/projects/:id
 * @access Private
 */
const updateProject = asyncHandler(async (req, res) => {
  const { id: projectID } = req.params;

  const project = await Project.findByIdAndUpdate(projectID, req.body, {
    new: true
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json({ project });
});

/**
 * @desc delete project by id
 * @endpoint DELETE /api/projects/:id
 * @access Private
 */
const deleteProject = asyncHandler(async (req, res) => {
  const { id: projectID } = req.params;

  const project = await Project.findByIdAndDelete(projectID, { new: false });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json({ project });
});

module.exports = {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject
};
