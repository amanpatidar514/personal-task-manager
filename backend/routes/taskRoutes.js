const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById
} = require("../controllers/taskController");

// GET /tasks
router.get("/", getTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks
router.post("/", createTask);

module.exports = router;