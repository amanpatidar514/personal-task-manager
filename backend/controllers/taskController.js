const mongoose = require("mongoose");
const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate
    } = req.body || {};

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required"
      });
    }

    // Create task in MongoDB
    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate
    });

    // Send response
    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    next(error);
  }
};


// Get all tasks with filtering and sorting
const getTasks = async (req, res, next) => {
  try {
    const { status, sortBy, order } = req.query;

    // Validate status
    const allowedStatuses = ["todo", "in_progress", "done"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    // Validate sorting field
    if (sortBy && !["dueDate", "priority"].includes(sortBy)) {
      return res.status(400).json({
        message: "Invalid sorting field"
      });
    }

    // Validate sorting order
    if (order && !["asc", "desc"].includes(order)) {
      return res.status(400).json({
        message: "Order must be asc or desc"
      });
    }

    // Build filter
    const filter = {};

    if (status) {
      filter.status = status;
    }


    // Build MongoDB query
    let query = Task.find(filter);

    const sortOrder = order === "desc" ? -1 : 1;

    // Sort by due date in MongoDB
    if (sortBy === "dueDate") {
      query = query.sort({ dueDate: sortOrder });
    }

    // Fetch tasks
    let tasks = await query;

    // Sort by priority in Node.js
    if (sortBy === "priority") {
      const priorityOrder = {
        low: 1,
        medium: 2,
        high: 3
      };

      tasks.sort((a, b) => {
        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        ) * sortOrder;
      });
    }


    // Send response
    res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (error) {
    next(error);
  }
};


// Get a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check whether the ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    // Find task by ID
    const task = await Task.findById(id);

    // Check whether task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Return task
    res.status(200).json({
      task
    });

  } catch (error) {
    next(error);
  }
};


const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      priority,
      status,
      dueDate
    } = req.body || {};

    // Validate task ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    // Check whether at least one field is provided
    if (
      title === undefined &&
      description === undefined &&
      priority === undefined &&
      status === undefined &&
      dueDate === undefined
    ) {
      return res.status(400).json({
        message: "At least one field is required to update"
      });
    }

    // Validate title if provided
    if (title !== undefined && (
      typeof title !== "string" || !title.trim()
    )) {
      return res.status(400).json({
        message: "Task title cannot be empty"
      });
    }

    // Find and update task
    const task = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(title !== undefined && { title: title.trim() }),
          ...(description !== undefined && { description }),
          ...(priority !== undefined && { priority }),
          ...(status !== undefined && { status }),
          ...(dueDate !== undefined && { dueDate })
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Check whether task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    next(error);
  }
};




module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask
};
