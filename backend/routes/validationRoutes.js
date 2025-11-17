import express from "express";
import { validateAll } from "../controllers/validationController.js";

const router = express.Router();

router.get("/all", validateAll);

export default router;
