import { getAllDepartments } from "../services/departmentService.js";
import { getClasses } from "../services/classService.js";
import { getStudents } from "../services/studentService.js";

export function searchDepartments(req, res) {
    const { keyword } = req.params;
    const data = getAllDepartments();

    const results = Object.entries(data)
        .filter(([id, obj]) => 
            obj?.name && obj.name.toLowerCase().includes(keyword.toLowerCase())
        )
        .map(([id, obj]) => ({ id, ...obj }));

    res.json(results);
}


export function searchClasses(req, res) {
    const { keyword } = req.params;
    const data = getClasses();

    const results = Object.entries(data)
        .filter(([id, obj]) => 
            obj?.name && obj.name.toLowerCase().includes(keyword.toLowerCase())
        )
        .map(([id, obj]) => ({ id, ...obj }));

    res.json(results);
}


export function searchStudents(req, res) {
    const { keyword } = req.params;
    const data = getStudents();

    const results = Object.entries(data)
        .filter(([id, obj]) =>
            (obj?.name && obj.name.toLowerCase().includes(keyword.toLowerCase())) ||
            (obj?.roll && obj.roll.toLowerCase().includes(keyword.toLowerCase()))
        )
        .map(([id, obj]) => ({ id, ...obj }));

    res.json(results);
}
export function globalSearch(req, res) {
    const keyword = (req.query.q || "").toLowerCase();

    if (!keyword) {
        return res.json([]);
    }

    const depts = getAllDepartments();
    const classes = getClasses();
    const students = getStudents();

    let results = [];

    // Departments
    for (const [id, obj] of Object.entries(depts)) {
        if (obj?.name?.toLowerCase().includes(keyword)) {
            results.push({
                type: "Department",
                id,
                name: obj.name
            });
        }
    }

    // Classes
    for (const [id, obj] of Object.entries(classes)) {
        if (obj?.name?.toLowerCase().includes(keyword)) {
            results.push({
                type: "Class",
                id,
                name: obj.name
            });
        }
    }

    // Students
    for (const [id, obj] of Object.entries(students)) {
        if (
            obj?.name?.toLowerCase().includes(keyword) ||
            obj?.roll?.toLowerCase().includes(keyword)
        ) {
            results.push({
                type: "Student",
                id,
                name: obj.name
            });
        }
    }

    res.json(results);
}
