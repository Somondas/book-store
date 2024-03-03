// import express from "express";
const { PORT, mongodbURL } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const { bookRoute } = require("./routes/bookRoutes");
// const PORT = 8000

const app = express();
app.use(express.json());
// console.log(PORT);
// >>Home Route
app.get("/", (req, res) => {
  return res.status(234).send("First MERN project after 7 months");
});

// >> Book Routes
app.use("/books", bookRoute);
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
