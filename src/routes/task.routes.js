import express from "express";
import {renderTask,createTask,renderTasktoEdit, editTask, toggleDone, deleteTask} from "../controllers/tasks.controller.js"

const router = express.Router();

// post new task
router.post("/tasks/add", createTask);

// get list of tasks
router.get("/", renderTask);

// update
router.get("/tasks/edit/:id", renderTasktoEdit)
router.post("/tasks/edit/:id", editTask)

// update done
router.get("/tasks/toggleDone/:id", toggleDone);

// delete
router.get("/tasks/delete/:id", deleteTask);

export default router;