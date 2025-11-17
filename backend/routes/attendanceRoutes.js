import express from "express";
import { takeAttendance, viewAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", takeAttendance);
router.get("/student/:studentId", viewAttendance);

export default router;
