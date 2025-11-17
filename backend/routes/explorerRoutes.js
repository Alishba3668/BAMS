import express from "express";
import {
  listDepartments,
  listClasses,
  listStudents,
  getChain
} from "../controllers/explorerController.js";

const router = express.Router();

router.get("/departments", listDepartments);
router.get("/classes", listClasses);
router.get("/students", listStudents);

router.get("/chain/:type/:id", getChain);

export default router;
