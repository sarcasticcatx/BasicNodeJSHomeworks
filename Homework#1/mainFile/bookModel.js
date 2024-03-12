import { v4 as uuid } from "uuid";

export class Books {
  id = uuid();
  constructor(title, author, publicationYear, quantity) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.quantity = quantity;
  }
}
