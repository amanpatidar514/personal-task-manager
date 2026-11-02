import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  // Group tasks according to their status
  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in_progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="task-list">
      <h2>My Tasks</h2>

      {/* To Do Tasks */}
      <div className="task-group">
        <h3>To Do ({todoTasks.length})</h3>

        {todoTasks.length === 0 ? (
          <p>No tasks to do.</p>
        ) : (
          todoTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))
        )}
      </div>

      {/* In Progress Tasks */}
      <div className="task-group">
        <h3>In Progress ({inProgressTasks.length})</h3>

        {inProgressTasks.length === 0 ? (
          <p>No tasks in progress.</p>
        ) : (
          inProgressTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <div className="task-group">
        <h3>Done ({doneTasks.length})</h3>

        {doneTasks.length === 0 ? (
          <p>No completed tasks.</p>
        ) : (
          doneTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
