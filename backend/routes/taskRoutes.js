const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask
} = require("../controllers/taskController");

// GET /tasks
router.get("/", getTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

module.exports = router;