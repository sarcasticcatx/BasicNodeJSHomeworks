import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";
import { Trainers } from "./trainers.model.js";

const TRAINERS_PATH = createPath(["data", "trainers.json"]);

const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(TRAINERS_PATH, trainers);
};
//get all trainers
export const getAllTrainers = async (filters) => {
  const trainers = await DataService.readJSONFile(TRAINERS_PATH);

  //the bonus with quaery - return only teachers that are currently teaching
  if (filters?.firstName) {
    trainers = trainers.filter(
      (trainer) => trainer.firstName === filters.firstName
    );
  }

  if (filters?.isCurrentlyTeaching) {
    trainers = trainers.filter((trainer) => {
      if (filters.isCurrentlyTeaching === "true")
        return trainer.isCurrentlyTeaching;
      if (filters.isCurrentlyTeaching === "false")
        return !trainer.isCurrentlyTeaching;
    });
  }
  //sort trainers by the number of courses they have finished
  trainers.sort((a, b) => a.coursesFinished - b.coursesFinished);

  return trainers;
};
// add a trainer

export const addTrainers = async (
  firstName,
  lastName,
  email,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();

  const addTrainer = new Trainers(
    firstName,
    lastName,
    email,
    timeEmployed,
    coursesFinished
  );

  const updatedTrainers = [...trainers, addTrainer];

  await saveTrainers(updatedTrainers);

  return addTrainer;
};

// get trainer by id
export const getTrainerById = async (trainerId) => {
  const trainers = await getAllTrainers();

  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

  if (!foundTrainer) throw new Error("Trainer with that id doesnt exist");

  return foundTrainer;
};
// update trainers
export const updateTrainers = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();

  if (!trainers.some((trainer) => trainer.id === trainerId))
    throw new Error("cant update trainer cuz trainer information not found");

  const updatedTrainers = trainers.map((trainer) => {
    if (trainer.id === trainerId) {
      return { ...trainer, ...updateData };
    } else {
      return trainer;
    }
  });

  await saveTrainers(updatedTrainers);
};

// deleting trainers

export const deleteTrainer = async (trainerId) => {
  const trainers = await getAllTrainers();

  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerId
  );

  if (updatedTrainers.length === trainers.length)
    throw new Error("uspeshno izbrishan / ne postoi");

  await saveTrainers(updatedTrainers);
};
// and last delete tehm all
export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
