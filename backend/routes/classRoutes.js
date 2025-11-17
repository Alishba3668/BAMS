import express from "express";
import {
  getAllClasses,
  getDeptClasses,
  createClass,
  editClass,
  removeClass
} from "../controllers/classController.js";

const router = express.Router();

router.get("/all", getAllClasses);
router.get("/dept/:deptId", getDeptClasses);
router.post("/add", createClass);
router.put("/update/:id", editClass);
router.delete("/delete/:id", removeClass);

export default router;
