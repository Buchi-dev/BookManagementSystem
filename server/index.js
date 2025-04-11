/**
 * Book Management System - Server
 * 
 * This is the main server file that handles all API requests for managing books.
 * It provides endpoints for creating, reading, updating, and deleting books (CRUD operations).
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert ESM module paths to file paths (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our books database file
const BOOKS_FILE = path.join(__dirname, 'data', 'books.json');

// ===== DATABASE SETUP =====
// Ensure the data directory exists
fs.ensureDirSync(path.join(__dirname, 'data'));

// Ensure books.json exists and is a valid JSON array
if (!fs.existsSync(BOOKS_FILE)) {
    // If file doesn't exist, create it with an empty array
    fs.writeJsonSync(BOOKS_FILE, [], { spaces: 2 });
} else {
    try {
        // Try to read the file to check if it's valid JSON
        const content = fs.readJsonSync(BOOKS_FILE);
        if (!Array.isArray(content)) {
            console.warn('books.json is not an array. Resetting to empty array.');
            fs.writeJsonSync(BOOKS_FILE, [], { spaces: 2 });
        }
    } catch (error) {
        console.error('Error reading books.json. Resetting to empty array:', error);
        fs.writeJsonSync(BOOKS_FILE, [], { spaces: 2 });
    }
}

// ===== EXPRESS SERVER SETUP =====
const app = express();

// Enable Cross-Origin Resource Sharing (allows frontend from different domain to access this API)
app.use(cors());

// Parse JSON bodies in requests
app.use(express.json());

// ===== HELPER FUNCTIONS =====

/**
 * Read books from the JSON file
 * @returns {Array} Array of book objects
 */
const readBooks = () => {
    try {
        const data = fs.readJsonSync(BOOKS_FILE);
        // Ensure that we always return an array
        if (!Array.isArray(data)) {
            console.warn('books.json data is not an array. Returning empty array.');
            return [];
        }
        return data;
    } catch (error) {
        console.error('Error reading books file:', error);
        return [];
    }
};

/**
 * Write books to the JSON file
 * @param {Array} books - Array of book objects to save
 * @returns {boolean} Success or failure
 */
const writeBooks = (books) => {
    try {
        fs.writeJsonSync(BOOKS_FILE, books, { spaces: 2 });
        return true;
    } catch (error) {
        console.error('Error writing books file:', error);
        return false;
    }
};

// ===== API ROUTES =====

// Home route - just to check if API is running
app.get('/', (req, res) => {
    res.json({ message: 'Library API is running' });
});

/**
 * GET /books - Retrieve all books
 * GET /bookGet - Alternative route for retrieving all books (beginner-friendly naming)
 * 
 * Returns an array of all book objects
 */
app.get('/books', getAllBooks);
app.get('/bookGet', getAllBooks);

// Function to handle getting all books (reused by both routes)
function getAllBooks(req, res) {
    try {
        const books = readBooks();
        // Ensure we're always returning an array
        if (!Array.isArray(books)) {
            console.warn('readBooks() did not return an array. Returning empty array instead.');
            return res.json([]);
        }
        return res.json(books);
    } catch (error) {
        console.error('Error in book retrieval route:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

/**
 * GET /books/:id - Get a specific book by ID
 * GET /bookGet/:id - Alternative route for getting a specific book (beginner-friendly naming)
 * 
 * Path parameter:
 * - id: The book ID to find
 * 
 * Returns:
 * - 200 OK with book object if found
 * - 404 Not Found if book with ID doesn't exist
 */
app.get('/books/:id', getBookById);
app.get('/bookGet/:id', getBookById);

// Function to handle getting a book by ID (reused by both routes)
function getBookById(req, res) {
    const books = readBooks();
    const book = books.find(b => b.bookId === req.params.id);
    
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
}

/**
 * POST /books - Create a new book (original route)
 * POST /bookAdd - Alternative route for adding a book (beginner-friendly naming)
 * 
 * Request body: 
 * {
 *   "bookId": "string",
 *   "title": "string",
 *   "author": "string",
 *   "publicationYear": number
 * }
 * 
 * Returns:
 * - 201 Created with the created book object
 * - 400 Bad Request if any required fields are missing
 * - 400 Bad Request if book ID already exists
 * - 500 Server Error if failed to save
 */
app.post('/books', addNewBook);
app.post('/bookAdd', addNewBook);

// Function to handle adding a new book (reused by both routes)
function addNewBook(req, res) {
    const { bookId, title, author, publicationYear } = req.body;
    
    // Validate required fields
    if (!bookId || !title || !author || !publicationYear) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const books = readBooks();
    
    // Check if book ID already exists
    if (books.some(b => b.bookId === bookId)) {
        return res.status(400).json({ error: 'Book ID already exists' });
    }
    
    // Add new book
    const newBook = {
        bookId,
        title,
        author,
        publicationYear: parseInt(publicationYear)
    };
    
    books.push(newBook);
    
    if (writeBooks(books)) {
        res.status(201).json(newBook);
    } else {
        res.status(500).json({ error: 'Failed to save book' });
    }
}

/**
 * PUT /books/:id - Update an existing book
 * 
 * Path parameter:
 * - id: The book ID to update
 * 
 * Request body: (all fields optional)
 * {
 *   "title": "string",
 *   "author": "string",
 *   "publicationYear": number
 * }
 * 
 * Returns:
 * - 200 OK with updated book object
 * - 404 Not Found if book with ID doesn't exist
 * - 500 Server Error if failed to update
 */
app.put('/books/:id', (req, res) => {
    const { title, author, publicationYear } = req.body;
    const bookId = req.params.id;
    
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.bookId === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    // Update book data
    books[bookIndex] = {
        ...books[bookIndex],
        title: title || books[bookIndex].title,
        author: author || books[bookIndex].author,
        publicationYear: publicationYear ? parseInt(publicationYear) : books[bookIndex].publicationYear
    };
    
    if (writeBooks(books)) {
        res.json(books[bookIndex]);
    } else {
        res.status(500).json({ error: 'Failed to update book' });
    }
});

/**
 * DELETE /books/:id - Delete a book
 * 
 * Path parameter:
 * - id: The book ID to delete
 * 
 * Returns:
 * - 200 OK with success message
 * - 404 Not Found if book with ID doesn't exist
 * - 500 Server Error if failed to delete
 */
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const books = readBooks();
    
    const initialLength = books.length;
    const updatedBooks = books.filter(b => b.bookId !== bookId);
    
    if (updatedBooks.length === initialLength) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    if (writeBooks(updatedBooks)) {
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

// ===== START SERVER =====
const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Books database located at: ${BOOKS_FILE}`);
    console.log(`Open http://localhost:${PORT} in your browser to check if the server is running`);
});

