import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from "../services/studentService.js";

export const getAllStudents = (req, res) => {
  const all = getStudents();
  const filtered = {};

  for (const id in all) {
    const chain = all[id].blockchain.chain;
    const lastBlock = chain[chain.length - 1];

    // Hide deleted students
    if (lastBlock.data.type !== "DELETE_STUDENT") {
      filtered[id] = all[id];
    }
  }

  res.json(filtered);
};


export const createStudent = (req, res) => {
  const { name, roll, classId } = req.body;
  const response = addStudent(name, roll, classId);
  if (!response) return res.status(404).json({ error: "Class not found" });

  res.json(response);
};

export const editStudent = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = updateStudent(id, name);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
};

export const removeStudent = (req, res) => {
  const { id } = req.params;

  const ok = deleteStudent(id);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.json({ message: "Student marked deleted" });
};
