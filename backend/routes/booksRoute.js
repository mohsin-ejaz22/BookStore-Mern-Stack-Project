import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";

// Route for saving a new book (with duplicate title check)
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        // Check if a book with the same title already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return res.status(409).json({ message: "A book with this title already exists." });
        }

        // Creating a new book document
        const newBook = new Book({
            title,
            author,
            publishYear,
        });

        // Saving book to the database
        await newBook.save();
        return res.status(201).json(newBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route for Getting All Books from the database
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Getting a Book by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Updating a Book
router.put("/:id", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        // Check if another book already exists with the same title
        const existingBook = await Book.findOne({ title });
        if (existingBook && existingBook._id.toString() !== req.params.id) {
            return res.status(409).json({ message: "A book with this title already exists." });
        }

        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Deleting a Book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
