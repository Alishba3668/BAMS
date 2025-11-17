import fs from "fs-extra";
import path from "path";
import { getStudents } from "./studentService.js";
import { getClasses } from "./classService.js";
import { getAllDepartments } from "./departmentService.js";
import Blockchain from "../blockchain/Blockchain.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../storage/students.json");

function loadStudents() {
  return fs.readJsonSync(file);
}

function saveStudents(obj) {
  fs.writeJsonSync(file, obj, { spaces: 2 });
}

export function markAttendance(studentId, status) {
  const students = loadStudents();
  const classes = getClasses();
  const depts = getAllDepartments();

  // Student exists?
  if (!students[studentId]) return null;

  const studentObj = students[studentId];
  const classId = studentObj.parentClass;

  // Class exists?
  if (!classes[classId]) return null;

  const deptId = classes[classId].parentDept;

 // REBUILD STUDENT BLOCKCHAIN INSTANCE
const rawStudentChain = studentObj.blockchain;
const studentChain = new Blockchain(studentObj.name);
studentChain.chain = rawStudentChain.chain;

// REBUILD CLASS BLOCKCHAIN INSTANCE
const rawClassChain = classes[classId].blockchain;
const classChain = new Blockchain(classes[classId].name);
classChain.chain = rawClassChain.chain;

// REBUILD DEPARTMENT BLOCKCHAIN INSTANCE
const rawDeptChain = depts[deptId].blockchain;
const deptChain = new Blockchain(depts[deptId].name);
deptChain.chain = rawDeptChain.chain;

  // --------------------------------------------
  // Prepare block payload
  // --------------------------------------------
  const blockData = {
    type: "ATTENDANCE",
    studentId,
    classId,
    deptId,
    status,
    timestamp: Date.now()
  };

  // --------------------------------------------
  // Mine the attendance block into student chain
  // --------------------------------------------
  studentChain.addBlock(blockData);

  // Save updated blockchain back to file
  students[studentId].blockchain = studentChain;
  saveStudents(students);

  return blockData;
}

export function getStudentAttendance(studentId) {
  const students = loadStudents();
  if (!students[studentId]) return null;

  // Rebuild Blockchain instance
  const raw = students[studentId].blockchain;
  const chain = new Blockchain(students[studentId].name);
  chain.chain = raw.chain;

  return chain.chain.map((block, idx) => ({
  ...block,
  index: idx
}));
}
