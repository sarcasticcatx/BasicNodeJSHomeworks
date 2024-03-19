import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";

const STUDENTS_PATH = createPath(["data", "students.json"]);

const saveStudents = async (students) => {
  await DataService.saveJSONFile(STUDENTS_PATH, students);
};

// get all students

export const getAllStudents = async (filters) => {
  let students = await DataService.readJSONFile(STUDENTS_PATH);

  if (filters?.gender) {
    students = students.filter(
      (students) => students.gender === "filters.gender"
    );

    if (filters.sortBy) {
      students = students.sort((a, b) => a.age - b.age);
    }
  }

  return students;
};
// get students by id

export const getAllStudentsById = async (studentsId) => {
  const students = await getAllStudents();

  const foundStudent = students.find((student) => student.id === studentsId);

  if (!foundStudent) throw new Error("Student not found");

  return foundStudent;
};
