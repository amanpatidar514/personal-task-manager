
# Personal Task Manager

A full-stack task management application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The application allows users to create, view, update, delete, filter, and sort their personal tasks.

## Features

- Create tasks with title, description, priority, status, and due date.
- View all tasks grouped by status.
- Update task status.
- Delete tasks.
- Filter tasks by status.
- Sort tasks by due date and priority.
- Input validation and error handling.
- Loading indicators and API error messages.
- Responsive dashboard layout.

## Technology Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

task-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/amanpatidar514/personal-task-manager.git

cd task-manager

### 2. Backend setup

cd backend

npm install

Create a `.env` file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend:

npm run dev

The backend will run at:

http://localhost:5000

### 3. Frontend setup

Open another terminal:

cd frontend

npm install

Start the frontend:

npm run dev

The frontend will run at:

http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /tasks | Create a task |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a task by ID |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

### Filtering and Sorting

Filter tasks by status:

GET /tasks?status=todo

Sort by due date:

GET /tasks?sortBy=dueDate&order=asc

Sort by priority:

GET /tasks?sortBy=priority&order=desc

Combine filtering and sorting:

GET /tasks?status=todo&sortBy=priority&order=desc

## Environment Variables

The backend requires:

- PORT: Backend server port.
- MONGO_URI: MongoDB connection string.

Do not commit your actual `.env` file or database credentials.

## Author

Developed as part of the MERN Stack Internship Assessment at Codewise Infotech.
