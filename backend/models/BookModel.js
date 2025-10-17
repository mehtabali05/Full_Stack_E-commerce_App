// const mongoose = require("mongoose");
import mongoose from "mongoose";

// Define the schema (blueprint of a book)
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // title is mandatory
      trim: true,     // removes extra spaces
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // price cannot be negative
    },
    offerPrice: {
        type: Number,
        required: true,
        min: 0, // price cannot be negative
    },
    category: {
      type: String,
    //   enum: ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Other"], // optional categories
      // default: "Other",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0, 
    },
    reviews: {
      type: Number,
      required: true,
      default: 0, 
    }, 
    image: {
      type: String,
      required: true
    },
  },
  { timestamps: true } // removes __v field from documents
);

// Create model
const Book = mongoose.model("Book", bookSchema);

export default Book;
