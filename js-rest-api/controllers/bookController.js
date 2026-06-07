const Book = require('../models/book');

// GET /api/books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas pobierania danych", error: err.message });
    }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Nie znaleziono zasobu" });
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ message: "Niepoprawne ID", error: err.message });
    }
};

// POST /api/books
exports.createBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ message: "Tytuł i autor są wymagani" });
        }
        const newBook = new Book({ title, author });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas dodawania", error: err.message });
    }
};

// PUT /api/books/:id
exports.updateBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const updateData = {};
        if (title) updateData.title = title;
        if (author) updateData.author = author;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedBook) return res.status(404).json({ message: "Nie znaleziono książki" });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: "Błąd podczas aktualizacji", error: err.message });
    }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Nie znaleziono książki" });
        res.status(200).json({ message: "Książka usunięta", book: deletedBook });
    } catch (err) {
        res.status(400).json({ message: "Błąd podczas usuwania", error: err.message });
    }
};
