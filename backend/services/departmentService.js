import fs from "fs-extra";
import path from "path";
import Blockchain from "../blockchain/Blockchain.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../storage/departments.json");

function load() {
  return fs.readJsonSync(file);
}

function save(obj) {
  fs.writeJsonSync(file, obj, { spaces: 2 });
}

export function getAllDepartments() {
  return load();
}

export function addDepartment(name) {
  const data = load();
  const id = "dept_" + Date.now();

  const chain = new Blockchain(name);
  chain.createGenesisBlock();

  data[id] = {
    name,
    blockchain: chain
  };

  save(data);
  return { id, name };
}

export function updateDepartment(id, newName) {
  const data = load();
  if (!data[id]) return null;

  // Rebuild chain
  const rawChain = data[id].blockchain;
  const bc = new Blockchain(data[id].name);
  bc.chain = rawChain.chain;
  bc.difficulty = rawChain.difficulty || 2;

  // Add block
  bc.addBlock({
    type: "UPDATE_DEPT",
    newName,
    timestamp: Date.now()
  });

  // Save
  data[id].blockchain = bc;
  data[id].name = newName;

  save(data);
  return data[id];
}

export function deleteDepartment(id) {
  const data = load();
  if (!data[id]) return null;

  // Rebuild chain
  const rawChain = data[id].blockchain;
  const bc = new Blockchain(data[id].name);
  bc.chain = rawChain.chain;
  bc.difficulty = rawChain.difficulty || 2;

  bc.addBlock({
    type: "DELETE_DEPT",
    status: "deleted",
    timestamp: Date.now()
  });

  // Save
  data[id].blockchain = bc;

  save(data);
  return true;
}
