import express from "express";
import { studentsRouter } from "./src/students.routes.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", (req, res) => {
  res.send("<h1> Hello from all students</h1>");
});

app.use("/students", studentsRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is climbing up at port: ${PORT}`);
});
