import express from "express";
import {
  getAllStudents,
  createStudent,
  editStudent,
  removeStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/all", getAllStudents);
router.post("/add", createStudent);
router.put("/update/:id", editStudent);
router.delete("/delete/:id", removeStudent);

export default router;
