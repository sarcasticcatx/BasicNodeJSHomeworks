import { DataService } from "./DataService.js";
import { Books } from "./bookModel.js";
import { createPath } from "./createPath.js";
import { log } from "./log.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

// get books
const getAllBooks = async () => {
  const books = await DataService.readJSONFile(BOOKS_PATH);

  return books;
};

// save books
const saveBooks = async (books) => {
  await DataService.saveJSONFile(BOOKS_PATH, books);
};

// add a book by id
const addBookById = async (title, author, publicationYear, quantity) => {
  const books = await getAllBooks();

  const newBook = new Books(title, author, publicationYear, quantity);

  //addint it to the arry
  const updatedBook = [...books, newBook];

  //save-in them in the file system
  await saveBooks(updatedBook);

  log.emit("add-book", newBook.id);
};
// listing all books in the inventory
const listOfBooks = async () => {
  const books = await getAllBooks();

  //a list
  books.forEach((book) => {
    console.log(
      `Title: ${book.title}, Author: ${book.author}, Quantity: ${book.quantity}`
    );
  });
};

// update book details
const updateBook = async (
  bookId,
  titleNew,
  authorNew,
  publicationYearNew,
  quantityNew
) => {
  const books = await getAllBooks();

  const identificacion = books.find((books) => books.id === bookId);
  if (!identificacion) throw new Error("try again sir");

  const updatedBooks = books.map((books) => {
    if (books.id === bookId) {
      return {
        ...books,
        title: titleNew,
        author: authorNew,
        publicationYear: publicationYearNew,
        quantity: quantityNew,
      };
    } else {
      return books;
    }
  });
  await saveBooks(updatedBooks);

  log.emit("edit-book", bookId);
};

//delete books by id
const deleteBook = async (bookId) => {
  const books = await getAllBooks();

  const deleteABookWithID = books.filter((books) => books.id !== bookId);

  if (books.length === deleteABookWithID.length)
    throw new Error("book does not exist with that id");

  await saveBooks(deleteABookWithID);

  log.emit("delete-book", bookId);
};

const inventory = async () => {
  try {
    // await addBookById("Book 4", "Authur 4", 2000, 700);
    // await addBookById("Book 6", "Authur 6", 30, 8);
    // await addBookById("Mary Poppins", "P.L Travers", 1934, 500);
    // await addBookById("book 44", "Avtor", 3009, 40);

    await listOfBooks();
    // await deleteBook("afc14740-f105-49f7-84e0-762b7ba698c1");
    // await updateBook(
    //   "ca89fb30-d768-4987-9049-6f022972f52b",
    //   "Harry Potter and the Half Blood Prince",
    //   "JK Rowling",
    //   2005,
    //   60000
    // );

    const books = await getAllBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};
inventory();
