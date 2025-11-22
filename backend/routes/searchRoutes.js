import express from "express";
import {
  searchDepartments,
  searchClasses,
  searchStudents,
  globalSearch
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/", globalSearch);           // <-- Add this line
router.get("/dept/:keyword", searchDepartments);
router.get("/class/:keyword", searchClasses);
router.get("/student/:keyword", searchStudents);

export default router;
