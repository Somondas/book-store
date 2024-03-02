// import express from "express";
const { PORT, mongodbURL } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
// const PORT = 8000

const app = express();
app.use(express.json());
// console.log(PORT);

// >> Route to save a new Book
app.post("/books", async (req, res) => {
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
app.get("/books", async (req, res) => {
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
// >>Home Route
app.get("/", (req, res) => {
  return res.status(234).send("First MERN project after 7 months");
});
console.log(mongodbURL);
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
