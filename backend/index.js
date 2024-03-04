// import express from "express";
const { PORT, mongodbURL } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");
// const PORT = 8000

const app = express();
app.use(express.json());

// ? Using CORS
// ? Ways of using CORS-
// ** 1. All all origins with Default of cors(*)
app.use(cors());
// ** 2. Allow Custom Origins(it's a better way beacause we have more control over it.).
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
// console.log(PORT);
// >>Home Route
app.get("/", (req, res) => {
  return res.status(234).send("First MERN project after 7 months");
});

// >> Book Routes
app.use("/books", bookRoutes);
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
