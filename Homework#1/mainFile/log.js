import { EventEmitter } from "node:events";
import { createPath } from "./createPath.js";
import { appendFileSync } from "node:fs";

export const log = new EventEmitter();

//Path to the log file
const LOG_PATH = createPath(["data", "log.txt"]);

//Event listeners for the log events
log
  .on("add-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was added on: ${new Date()}\n`
    );
  })
  .on("edit-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was updated on: ${new Date()}\n`
    );
  })
  .on("delete-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was deleted on: ${new Date()}\n`
    );
  });
