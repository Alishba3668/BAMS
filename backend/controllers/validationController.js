import fs from "fs-extra";
import path from "path";
import Blockchain from "../blockchain/Blockchain.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Correct storage resolver ALWAYS points to ../storage/
const storage = (filename) => path.join(__dirname, "../storage", filename);

export function validateAll(req, res) {
  try {
    // Load JSON files
    const deptData = fs.readJsonSync(storage("departments.json"));
    const classData = fs.readJsonSync(storage("classes.json"));
    const studentData = fs.readJsonSync(storage("students.json"));

    const results = {
      departments: {},
      classes: {},
      students: {}
    };

    // Validate Departments
    for (const [id, d] of Object.entries(deptData)) {
      const bc = new Blockchain(d.name);
      bc.chain = d.blockchain.chain;
      results.departments[id] = bc.isChainValid();
    }

    // Validate Classes
    for (const [id, c] of Object.entries(classData)) {
      const bc = new Blockchain(c.name);
      bc.chain = c.blockchain.chain;
      results.classes[id] = bc.isChainValid();
    }

    // Validate Students
    for (const [id, s] of Object.entries(studentData)) {
      const bc = new Blockchain(s.name);
      bc.chain = s.blockchain.chain;
      results.students[id] = bc.isChainValid();
    }

    return res.json(results);

  } catch (err) {
    console.log("VALIDATION ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
