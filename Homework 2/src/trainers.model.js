import { v4 as uuid } from "uuid";

export class Trainers {
  id = uuid();
  isCurrentlyTeaching = true;
  constructor(firstName, lastName, email, timeEmployed, coursesFinished) {
    (this.firstName = firstName), // string
      (this.lastName = lastName), //string
      (this.email = email), // string
      (this.timeEmployed = timeEmployed), //string ex 6 months or 1 year 3 months
      (this.coursesFinished = coursesFinished); // number
  }
}
