import fs from "fs-extra";
import path from "path";
import Blockchain from "../blockchain/Blockchain.js";
import { getAllDepartments } from "./departmentService.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../storage/classes.json");

function load() {
  return fs.readJsonSync(file);
}

function save(obj) {
  fs.writeJsonSync(file, obj, { spaces: 2 });
}

export function getClasses() {
  return load();
}

export function getClassesByDept(deptId) {
  const data = load();
  return Object.entries(data).filter(([id, obj]) => obj.parentDept === deptId);
}

export function addClass(name, deptId) {
  const depts = getAllDepartments();
  if (!depts[deptId]) return null;

  // rebuild parent dept chain
  const rawDeptChain = depts[deptId].blockchain;
  const deptChain = new Blockchain(depts[deptId].name);
  deptChain.chain = rawDeptChain.chain;
  deptChain.difficulty = rawDeptChain.difficulty || 2;

  const parentHash = deptChain.getLatestBlock().hash;

  const data = load();
  const classId = "class_" + Date.now();

  const chain = new Blockchain(name);
  chain.createGenesisBlock(parentHash);

  data[classId] = {
    name,
    parentDept: deptId,
    blockchain: chain
  };

  save(data);
  return { classId, name };
}

export function updateClass(classId, newName) {
  const data = load();
  if (!data[classId]) return null;

  // -------------------------
  // Rebuild class blockchain
  // -------------------------
  const raw = data[classId].blockchain;

  const bc = new Blockchain(data[classId].name);
  bc.chain = raw.chain;
  bc.difficulty = raw.difficulty || 2;

  // -------------------------
  // Add block
  // -------------------------
  bc.addBlock({
    type: "UPDATE_CLASS",
    name: newName,
    timestamp: Date.now()
  });

  // -------------------------
  // Save updated chain + name
  // -------------------------
  data[classId].blockchain = bc;
  data[classId].name = newName;

  save(data);

  return data[classId];
}

export function deleteClass(classId) {
  const data = load();
  if (!data[classId]) return null;

  // Rebuild blockchain
  const raw = data[classId].blockchain;

  const bc = new Blockchain(data[classId].name);
  bc.chain = raw.chain;
  bc.difficulty = raw.difficulty || 2;

  bc.addBlock({
    type: "DELETE_CLASS",
    status: "deleted",
    timestamp: Date.now()
  });

  // Save
  data[classId].blockchain = bc;
  data[classId].deleted = true; // soft delete

  save(data);
  return true;
}
