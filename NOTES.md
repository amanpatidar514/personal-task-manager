
# Assessment Notes

## 1. How would you modify this application to support multiple users with private task lists?

I would implement user authentication using JWT (JSON Web Tokens) and store a user reference in every task document. Each API endpoint would identify the authenticated user through middleware and retrieve, update, or delete only tasks belonging to that user. This would ensure that users can access only their own tasks.

## 2. What would become a performance concern if the application had thousands of tasks, and how would you address it?

Fetching thousands of tasks in a single request would increase database load, response time, and frontend rendering overhead. I would implement server-side pagination, add database indexes on frequently filtered or sorted fields such as status and dueDate, and fetch only the required records.


## 3. How did you use AI tools during development? Mention one suggestion you changed or rejected and explain why.

I used ChatGPT as a supporting tool during development to clarify technical concepts, troubleshoot errors, debug code, and understand issues related to API integration, React components, and backend functionality. It also helped me explore different approaches when I encountered implementation challenges. I reviewed and tested the suggested solutions before incorporating them into the project to ensure they met the application requirements.

One suggestion I changed was the initial approach of handling task updates by refreshing the entire task list after every operation. I considered the trade-off and kept this approach because it was simpler to implement, maintain, and sufficient for the scope of this assessment. For a larger application, I would consider updating the UI state directly to reduce unnecessary API requests.