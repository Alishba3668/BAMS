import fs from "fs-extra";
import path from "path";
import Blockchain from "../blockchain/Blockchain.js";
import { getClasses } from "./classService.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../storage/students.json");

function loadStudents() {
  return fs.readJsonSync(file);
}

function saveStudents(obj) {
  fs.writeJsonSync(file, obj, { spaces: 2 });
}

export function getStudents() {
  return loadStudents();
}

export function addStudent(name, roll, classId) {
  const classes = getClasses();
  if (!classes[classId]) return null;

  // Rebuild class chain
  const rawClassChain = classes[classId].blockchain;
  const classChain = new Blockchain(classes[classId].name);
  classChain.chain = rawClassChain.chain;
  classChain.difficulty = rawClassChain.difficulty || 2;

  const parentHash = classChain.getLatestBlock().hash;

  const data = loadStudents();
  const studentId = "stud_" + Date.now();

  const chain = new Blockchain(name);
  chain.createGenesisBlock(parentHash);

  data[studentId] = {
    name,
    roll,
    parentClass: classId,
    blockchain: chain
  };

  saveStudents(data);
  return { studentId, name };
}

export function updateStudent(id, newName) {
  const data = loadStudents();
  if (!data[id]) return null;

  // Rebuild student chain
  const rawChain = data[id].blockchain;
  const bc = new Blockchain(data[id].name);
  bc.chain = rawChain.chain;
  bc.difficulty = rawChain.difficulty || 2;

  // Add block
  bc.addBlock({
    type: "UPDATE_STUDENT",
    newName,
    timestamp: Date.now()
  });

  // Save
  data[id].blockchain = bc;
  data[id].name = newName;

  saveStudents(data);
  return data[id];
}

export function deleteStudent(id) {
  const data = loadStudents();
  if (!data[id]) return false;

  const studentObj = data[id];

  // Rebuild student blockchain
  const rawChain = studentObj.blockchain;
  const chain = new Blockchain(studentObj.name);
  chain.chain = rawChain.chain;
  chain.difficulty = rawChain.difficulty || 2;

  // Add delete block
  chain.addBlock({
    type: "DELETE_STUDENT",
    studentId: id,
    timestamp: Date.now(),
    status: "deleted"
  });

  // Save updated chain — DON'T delete student from JSON
  data[id].blockchain = chain;

  saveStudents(data);
  return true;
}
