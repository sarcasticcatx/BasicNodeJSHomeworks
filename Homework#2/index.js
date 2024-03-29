import express from "express";
import {
  getAllTrainers,
  getTrainerById,
  updateTrainers,
  addTrainers,
  deleteTrainer,
  deleteAllTrainers,
} from "./src/trainers.js";
import { createPath } from "./utils.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

const STATIC_FOLDER = createPath(["public"]);

app.use("/", express.static(STATIC_FOLDER));

app.get("/home", (req, res) => {
  return res.send(
    "<h1> i exist from the deep depths of the server express</h1>"
  );
});

// get all trainers
app.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const trainers = await getAllTrainers();

    console.log(filters);

    return res.json(trainers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//add a trainer
app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, coursesFinished } =
      req.body;

    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("u cannot add");

    const newTrainer = await addTrainers(
      firstName,
      lastName,
      email,
      timeEmployed,
      coursesFinished
    );

    return res.status(201).json(newTrainer);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
//get trainer by id
app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    const foundTrainer = await getTrainerById(trainerId);

    return res.json(foundTrainer);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});
//update a trainer //
app.patch("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const updateData = req.body;

    // if (updateData.id) throw new Error("Invalid Data");

    await updateTrainers(trainerId, updateData);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

//delete all - put above delete
app.delete("/trainers/all", async (req, res) => {
  try {
    await deleteAllTrainers([]);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//delete a trainer
app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is doing backflips at port ${PORT}`);
});
