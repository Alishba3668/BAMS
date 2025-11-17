import {
  getClasses,
  getClassesByDept,
  addClass,
  updateClass,
  deleteClass
} from "../services/classService.js";

export const getAllClasses = (req, res) => {
  res.json(getClasses());
};

export const getDeptClasses = (req, res) => {
  const { deptId } = req.params;
  res.json(getClassesByDept(deptId));
};

export const createClass = (req, res) => {
  const { name, deptId } = req.body;
  const response = addClass(name, deptId);
  if (!response) return res.status(404).json({ error: "Department not found" });

  res.json(response);
};

export const editClass = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = updateClass(id, name);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
};


export const removeClass = (req, res) => {
  const { id } = req.params;
  const ok = deleteClass(id);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.json({ message: "Class marked deleted" });
};
