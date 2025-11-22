import express from "express";
import { getAllDepartments } from "../services/departmentService.js";
import { getClasses } from "../services/classService.js";
import { getStudents } from "../services/studentService.js";
import Blockchain from "../blockchain/Blockchain.js";

const router = express.Router();

// -------------------- Departments --------------------
router.get("/departments", (req, res) => {
  const data = getAllDepartments();
  const result = {};

  for (const id in data) {
    const chain = data[id].blockchain.chain;
    const last = chain[chain.length - 1];

    result[id] = {
      name: data[id].name,
      deleted: last.data.type === "DELETE_DEPT"
    };
  }

  res.json(result);
});

// -------------------- Classes --------------------
router.get("/classes", (req, res) => {
  const data = getClasses();
  const result = {};

  for (const id in data) {
    const chain = data[id].blockchain.chain;
    const last = chain[chain.length - 1];

    result[id] = {
      name: data[id].name,
      deleted: last.data.type === "DELETE_CLASS"
    };
  }

  res.json(result);
});

// -------------------- Students --------------------
router.get("/students", (req, res) => {
  const data = getStudents();
  const result = {};

  for (const id in data) {
    const chain = data[id].blockchain.chain;
    const last = chain[chain.length - 1];

    result[id] = {
      name: data[id].name,
      deleted: last.data.type === "DELETE_STUDENT"
    };
  }

  res.json(result);
});

// -------------------- Get Chain --------------------
router.get("/chain/:type/:id", (req, res) => {
  const { type, id } = req.params;

  let source = null;
  if (type === "Departments") source = getAllDepartments();
  if (type === "Classes") source = getClasses();
  if (type === "Students") source = getStudents();

  if (!source[id]) return res.status(404).json({ error: "Not found" });

  const raw = source[id].blockchain;
  const chain = new Blockchain(source[id].name);
  chain.chain = raw.chain;

  res.json(chain.chain);
});

export default router;
