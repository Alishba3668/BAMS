import express from "express";
import cors from "cors";

import deptRoutes from "./routes/departmentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import validationRoutes from "./routes/validationRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import explorerRoutes from "./routes/explorerRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/departments", deptRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/validate", validationRoutes);
app.use("/search", searchRoutes);
app.use("/api/explorer", explorerRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
