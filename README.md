# Task List API

This project is a simple task list API using the MERN stack (MongoDB, Express.js, React, Node.js). The project has the following features:

- Add tasks to your to-do list.
- Mark tasks as complete.
- Edit tasks.
- Delete tasks.
- Drag-and-drop reordering of tasks.
- Data persistence with MongoDB.

## Prerequisites

First, ensure that you have the following requirements:

- **Node.js**: Download the latest version from [Node.js official website](https://nodejs.org/).
- **npm**: Check the latest npm version by running the command: `npm install npm@latest -g`.
- **MongoDB**: You need to have a MongoDB server running locally on the default port (27017) or set up a remote instance. Visit [MongoDB official website](https://www.mongodb.com/) for installation instructions or cloud setup.
- **create-react-app**: This is only necessary if you're setting up a new React project. You can install it globally by running the command: `npm install -g create-react-app`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Server Configuration](#server-configuration)
4. [Running the Application](#running-the-application)

### Installation

First, clone the repository to your local machine using:

```sh
git clone https://git@github.com:majdeddinea/Todo-List-App.git
cd your-repo-name
```

### Install server dependencies:

Next navigate to your project directory and install the necessary dependencies for the server.

```bash
cd server
npm install
```

### Install Client Dependencies

To set up the front-end part of your application, navigate to the client directory and install the necessary dependencies:

```bash
cd client
npm install
```

## Environment Setup

This application supports MongoDB connections both locally and through MongoDB Atlas, allowing for flexible development and deployment environments.

### Server Environment Variables

To configure the server environment variables:

1. **Navigate** to the `server` directory.
2. **Create** a `.env` file in the root of the `server` directory.
3. **Specify** the environment variables in the `.env` file:

```plaintext
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string. The application is configured to connect to MongoDB locally or via MongoDB Atlas, depending on the provided URI.

#### Local MongoDB Connection

For a local MongoDB instance, use:

```plaintext
MONGODB_URI=mongodb://localhost:27017/todolist
```

Ensure MongoDB is installed and running on your local machine. Replace `todolist` with the name of your local database.

#### MongoDB Atlas Connection

For MongoDB Atlas, use the connection string provided by Atlas:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
```

Fill in `<username>`, `<password>`, `<cluster-url>`, and `<dbname>` with your Atlas credentials.

### MongoDB Connection in Application

The application connects to MongoDB using Mongoose. The connection is configured to fallback to a local database URI if `MONGODB_URI` is not specified:

```javascript
// MongoDB connection setup in models/db.js
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost:27017/todolist";
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
```

This setup allows for seamless switching between local development and production environments without needing to change the application code.

This revised README section provides clear instructions on configuring the application for both local and Atlas MongoDB connections, emphasizing security practices such as excluding the `.env` file from version control.

## Running the Application

To get the application up and running, follow these steps:

### Start the Server

From the root of your project, start the server by running:

```bash
cd server
npm start
```

This will start the backend server on [http://localhost:5001](http://localhost:5001).

## Start the Client Application

To run the front-end part of your application, open a new terminal window or tab. Then, navigate to the `client` directory within your project and execute the following command to start the React application:

```bash
cd client
npm start
```

The application will now be running on [http://localhost:3000](http://localhost:3000).

### Running the Tests

To run the automated tests for the backend API, follow these steps:

1. **Navigate to the server directory**

```bash
cd server
```

2. **Run the tests using npm**

```bash
npm test
```

This command will execute all tests defined in the `tests` directory, including creating, fetching, updating, and deleting tasks through the API.

---

### API Endpoints

The following API endpoints are available:

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete an existing task
