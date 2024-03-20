import { Router } from "express";
import { getAllStudents, getAllStudentsById } from "./students.js";

export const studentsRouter = Router();

//get all students

studentsRouter.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const students = await getAllStudents(filters);

    console.log(filters);

    return res.json(students);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: error.message });
  }
});
// get students by id  - neznam shto e problemot tuka mi vrakja error u postman
studentsRouter.get("/students/:id", async (req, res) => {
  try {
    const studentsId = req.params.id;

    const foundStudent = await getAllStudentsById(studentsId);

    return res.json(foundStudent);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
});
