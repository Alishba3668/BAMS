import { getAllDepartments } from "../services/departmentService.js";
import { getClasses } from "../services/classService.js";
import { getStudents } from "../services/studentService.js";
import Blockchain from "../blockchain/Blockchain.js";

export const listDepartments = (req, res) => {
  res.json(getAllDepartments());
};

export const listClasses = (req, res) => {
  res.json(getClasses());
};

export const listStudents = (req, res) => {
  res.json(getStudents());
};

export const getChain = (req, res) => {
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
};
