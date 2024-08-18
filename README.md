# 📝 Task Manager TS

Task Manager TS is a powerful and modern task management application built with TypeScript, React, and Node.js. It features Google authentication, email/password sign-in, and a dynamic drag-and-drop interface powered by Pragmatic drag-and-drop. The app leverages ShadCN UI components, Vite for React tooling, and a scalable backend built with Express.js, Node.js, MongoDB, and Prisma ORM.

## 🚀 Live Preview

Check out the live preview of the project here:  
[Task Manager TS](https://task-manager-ts.onrender.com/)

## 🐳 Docker Image

A Docker image of the project is available at:  
[ghcr.io/rohitvpatil0810/task-manager-ts/task-manager-ts:latest](https://ghcr.io/rohitvpatil0810/task-manager-ts/task-manager-ts:latest)

## 🏗️ Monorepo Structure

The repository is structured as a monorepo containing two applications:

- **API**: The backend application built with Node.js, Express.js, MongoDB and Prisma ORM.
- **Web**: The frontend application built with React, Vite, and ShadCN UI components.

## ✨ Features

- 🔑 **Google Authentication**: Secure sign-in with Google OAuth.
- ✉️ **Email/Password Authentication**: Traditional email and password sign-in.
- 🎛️ **Drag and Drop**: Manage tasks with an intuitive drag-and-drop interface.
- 🖌️ **Modern UI Components**: Built with ShadCN UI for a responsive and user-friendly interface.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.9.0 or higher)
- [npm](https://www.npmjs.com/) (v9.8.1 or higher)
- [Docker](https://www.docker.com/) (for using the Docker image)
- [MongoDB](https://www.mongodb.com/) (for local development)

## ⚙️ Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rohitvpatil0810/task-manager-ts.git
   cd task-manager-ts
   ```

2. **Install dependencies:**

   For the API:

   ```bash
   cd apps/api
   npm install
   ```

   For the Web app:

   ```bash
   cd apps/web
   npm install
   ```

3. **Set up environment variables:**

   Copy the example environment variable files and configure them:

   ```bash
   cp ./apps/api/.env.example ./apps/api/.env
   cp ./apps/web/.env.example ./apps/web/.env.local
   ```

4. **Run the development server:**

   For the API:

   ```bash
   cd apps/api
   npm run dev
   ```

   For the Web app:

   ```bash
   cd apps/web
   npm run dev
   ```

## 📦 Deployment

The project is set up to build and push Docker images automatically with GitHub Actions. The workflow can be found at:  
`.github/workflows/docker-build-publish.yml`.

## 🤝 Acknowledgments

This project uses several excellent open-source tools and libraries:

- [Pragmatic drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/) for drag-and-drop functionality.
- [ShadCN UI](https://ui.shadcn.com/) for beautiful and responsive UI components.
- [Vite](https://vitejs.dev/) for fast and modern React tooling.
- [Prisma](https://www.prisma.io/orm) for type-safe database access.
- [Express.js](https://expressjs.com/) for backend server development.
- [MongoDB](https://www.mongodb.com/) for the database.

If you have any questions or issues, please feel free to [raise an issue](https://github.com/rohitvpatil0810/task-manager-ts/issues) or contact me via my [website](https://rohitvpatil.vercel.app/#contact).
