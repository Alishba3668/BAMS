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
