import { markAttendance, getStudentAttendance } from "../services/attendanceService.js";

export const takeAttendance = (req, res) => {
  const { studentId, status } = req.body;

  if (!["Present", "Absent", "Leave"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const result = markAttendance(studentId, status);

  if (!result) return res.status(404).json({ error: "Student not found" });

  res.json({ message: "Attendance marked", result });
};

export const viewAttendance = (req, res) => {
  const { studentId } = req.params;

  const result = getStudentAttendance(studentId);
  if (!result) return res.status(404).json({ error: "Student not found" });

  res.json(result);
};
