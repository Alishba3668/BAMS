import express from "express";
import {
  searchDepartments,
  searchClasses,
  searchStudents
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/dept/:keyword", searchDepartments);
router.get("/class/:keyword", searchClasses);
router.get("/student/:keyword", searchStudents);

export default router;
