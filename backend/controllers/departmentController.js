import {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
} from "../services/departmentService.js";

export const getDepartments = (req, res) => {
  const all = getAllDepartments();

  const filtered = {};

  for (const id in all) {
    const chain = all[id].blockchain.chain;

    // last block in chain
    const lastBlock = chain[chain.length - 1];

    // Hide soft-deleted departments
    if (lastBlock.data.type !== "DELETE_DEPT") {
      filtered[id] = all[id];
    }
  }

  res.json(filtered);
};

export const createDepartment = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const response = addDepartment(name);
  res.json(response);
};

export const editDepartment = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = updateDepartment(id, name);
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
};

export const removeDepartment = (req, res) => {
  const { id } = req.params;
  const ok = deleteDepartment(id);
  if (!ok) return res.status(404).json({ error: "Not found" });

  res.json({ message: "Department marked deleted" });
};
