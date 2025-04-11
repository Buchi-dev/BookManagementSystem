# Book Management System

A beginner-friendly full-stack application for managing a library of books with a React frontend and Node.js backend.

![Book Management System](https://via.placeholder.com/800x400?text=Book+Management+System)

## Project Overview

This project demonstrates a simple but complete web application that allows users to:
- View a list of books in a library
- Add new books to the library
- (Coming soon) Edit and delete existing books

The application consists of two main parts:
1. **Frontend (dashboard)**: A React application with a modern UI built using Material UI
2. **Backend (server)**: A Node.js Express server with a simple JSON file database

## Project Structure

```
Book-Management-System/
├── dashboard/             # Frontend React application
│   ├── public/            # Static assets
│   │   └── index.html     # HTML template
│   ├── src/               # React source code
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── index.html         # HTML template
│
├── server/                # Backend Node.js server
│   ├── data/              # JSON database
│   │   └── books.json     # Books data storage
│   ├── index.js           # Server code
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)
- A code editor (like [VS Code](https://code.visualstudio.com/))
- A web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/Buchi-dev/BookManagementSystem.git
cd BookManagementSystem
```

2. Install frontend dependencies
```bash
cd dashboard
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

### Running the Application

You need to run both the backend server and the frontend application:

#### 1. Start the backend server
```bash
cd server
npm start
```
This will start the server at http://localhost:1337

#### 2. Start the frontend application (in a new terminal)
```bash
cd dashboard
npm run dev
```
This will start the React application at http://localhost:5173

#### 3. Open in your browser
Open [http://localhost:5173](http://localhost:5173) to view the application

## How It Works

### Backend (server)

- Built with Express.js
- Uses a simple JSON file (`books.json`) as a database
- Provides RESTful API endpoints:

  Standard API routes:
  - `GET /books` - Get all books
  - `GET /books/:id` - Get a specific book by ID
  - `POST /books` - Add a new book
  - `PUT /books/:id` - Update an existing book
  - `DELETE /books/:id` - Delete a book
  
  Beginner-friendly API routes (do the same thing but with more intuitive naming):
  - `GET /bookGet` - Get all books
  - `GET /bookGet/:id` - Get a specific book by ID
  - `POST /bookAdd` - Add a new book

### Frontend (dashboard)

- Built with React and Vite
- Uses Material UI for styling
- Features multiple pages through React Router:
  - Home page (`/`) - Shows a list of all books
  - Add Book page (`/addbooks`) - Form to add a new book
- Uses the beginner-friendly API endpoints for better code readability

## Learning Resources

If you're new to web development, here are some resources to help you understand the technologies used:

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Material UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)

## Contributing

If you'd like to contribute to this project, please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, Express, and Material UI
- Uses Vite for frontend tooling
- Inspiration from various library management systems 