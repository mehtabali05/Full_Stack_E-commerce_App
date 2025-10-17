import express from "express";
import { authAdmin } from './../middlewares/authAdmin.js';
import { addBook, deleteBook, getBooks } from "../controllers/bookController.js";
import { upload } from "../config/multer.js";
const bookRouter = express.Router();

bookRouter.post("/add",authAdmin,upload.single("image"),addBook); 
bookRouter.get("/get-books",getBooks); 
bookRouter.delete("/delete-book/:id",authAdmin,deleteBook);

export default bookRouter;