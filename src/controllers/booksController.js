import httpStatus from "http-status";
import { Book } from "../models/books/books.js";
import { bookValidationSchema } from "../validation/booksValidation";

const uploadBook = async (req, res) => {
  // TO VALIDATE THE REQUEST DATA USONG JOI
  const { error, value } = bookValidationSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  // TO CHECK IF THE FILE WAS UPLOADED
  if (req.file) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Book cover image or pdf is required",
    });
  }

  const { title, author, category, publicationDate, isbn } = value;
  const bookPDF = req.file.filename;
  const bookCover = req.file.filename;

  try {
    // TO CHECK IF THE BOOK ALREADY EXISTS
    let book = await Book.findOne({ title });
    if (book) {
      return res.status(httpStatus.CONFLICT).json({
        statuus: "error",
        message: "Book already exists",
      });
    }

    // TO CREATE A NEW BOOK
    book = new Book({
      bookPDF,
      bookCOver,
      title,
      author,
      category,
      publicationDate,
      isbn,
    });

    // SAVE THE BOOK THE DATABASE
    book = await book.save();

    return res.status(httpStatus.CREATED).json({
      status: "error",
      message: "Book uploaded successfully",
      bookData: book,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occured while uploading the book",
    });
  }
};

//
const getBooks = async (req, res) => {
  try {
    let books = await Book.find({});

    if (books) {
      return res.status(200).json({
        message: "All books returned",
        bookData: books,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// delete book controller
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id; // TO EXTRACT THE ID FROM THE REQUEST PARAMETERS 
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID: User not found",
      });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

export { uploadBook, getBooks, deleteBook };
