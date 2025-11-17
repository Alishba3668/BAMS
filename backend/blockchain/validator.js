import Blockchain from "./Blockchain.js";

export function validateHierarchy(depts, classes, students) {
  const deptResult = {};
  const classResult = {};
  const studentResult = {};

  // -------- Departments --------
  for (const id in depts) {
    const raw = depts[id].blockchain;
    const bc = new Blockchain(depts[id].name);
    bc.chain = raw.chain;
    deptResult[id] = bc.isValid();
  }

  // -------- Classes --------
  for (const id in classes) {
    const raw = classes[id].blockchain;
    const bc = new Blockchain(classes[id].name);
    bc.chain = raw.chain;
    classResult[id] = bc.isValid();
  }

  // -------- Students --------
  for (const id in students) {
    const raw = students[id].blockchain;
    const bc = new Blockchain(students[id].name);
    bc.chain = raw.chain;
    studentResult[id] = bc.isValid();
  }

  return {
    departments: deptResult,
    classes: classResult,
    students: studentResult
  };
}
