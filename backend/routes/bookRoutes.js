const express = require("express");
const Book = require("../models/bookModel");

const router = express.Router();

// >> Route to save a new Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    // console.log(newBook);
    console.log(req.body.author);
    const book = await Book.create(newBook);
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// >> Route to get all the Books from the database
router.get("", async (req, res) => {
  try {
    const books = await Book.find({});

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// >> Get Single Book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const book = await Book.findById(id);
    // console.log(book);

    res.status(200).json({
      success: true,
      book,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// >> Update Single book data
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;

    const udpatedBook = await Book.findByIdAndUpdate(id, req.body);
    // console.log(newBook);

    // console.log(req.body.author);
    res.status(200).json({
      success: true,
      udpatedBook,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// >> Delete a Book data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      deleteBook,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
