# cpn-qa-platform-backend

# 📌 Features

## 🔐 Authentication

- **`POST`** `/api/auth/login` – Authenticate a user and receive a JWT
- **`POST`** `/api/auth/register` – Register a new user

## 👥 Users

- **`GET`** `/api/user/getAll` – Retrieve all users
- **`GET`** `/api/user/get/:id` – Retrieve a specific user by ID

## 📝 Posts

- **`GET`** `/api/post/getAll` – Retrieve all posts
- **`GET`** `/api/post/get/:id` – Retrieve a specific post by ID
- **`POST`** `/api/post/create` – Create a new post
- **`PATCH`** `/api/post/update/:id` – Update an existing post
- **`DELETE`** `/api/post/delete/:id` – Delete a post

## 💬 Comments

- **`GET`** `/api/comment/getAll` – Retrieve all comments
- **`GET`** `/api/comment/get/:id` – Retrieve a specific comment by ID
- **`POST`** `/api/comment/create` – Create a new comment
- **`PATCH`** `/api/comment/update/:id` – Update an existing comment
- **`DELETE`** `/api/comment/delete/:id` – Delete a comment

### 🧑‍💻 Getting Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and npm installed on your system.
- Postgres database and setup config in .env file
  
### Installation

1. Clone the repository:

  ```bash
   git clone https://github.com/your-username/cpn-qa-platform-backend.git
   cd cpn-qa-platform-backend
  ```

2. Install dependencies

  ```bash
    npm install or yarn
  ```
3. Run server
  ```bash
    npm run start or yarn start
  ```

