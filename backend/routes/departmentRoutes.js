import express from "express";
import {
  getDepartments,
  createDepartment,
  editDepartment,
  removeDepartment
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/all", getDepartments);
router.post("/add", createDepartment);
router.put("/update/:id", editDepartment);
router.delete("/delete/:id", removeDepartment);

export default router;
