import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our books database file
const BOOKS_FILE = path.join(__dirname, 'data', 'books.json');

// Ensure the data directory exists
fs.ensureDirSync(path.join(__dirname, 'data'));

// Ensure books.json exists and is a valid JSON array
if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeJsonSync(BOOKS_FILE, [], { spaces: 2 });
} else {
    try {
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

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to read books
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

// Helper function to write books
const writeBooks = (books) => {
    try {
        fs.writeJsonSync(BOOKS_FILE, books, { spaces: 2 });
        return true;
    } catch (error) {
        console.error('Error writing books file:', error);
        return false;
    }
};

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Library API is running' });
});

// Get all books
app.get('/books', (req, res) => {
    try {
        const books = readBooks();
        // Ensure we're always returning an array
        if (!Array.isArray(books)) {
            console.warn('readBooks() did not return an array. Returning empty array instead.');
            return res.json([]);
        }
        return res.json(books);
    } catch (error) {
        console.error('Error in /books route:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.bookId === req.params.id);
    
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
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
});

// Update a book
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

// Delete a book
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

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Books database located at: ${BOOKS_FILE}`);
});

