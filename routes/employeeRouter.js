import express from 'express';
import auth from '../middleware/auth.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// Create new Employee
router.post('/', auth, async (req, res) => {
    try {
        const { name, jabatan, nip } = req.body;

        const newEmployee = new Employee({
            name, nip, jabatan
        });
        // res.json(newEmployee);

        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    }
    catch (err) {
        res
            .status(500)
            .send(err);
    }
})

// Get employee data
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find();

        !employees ? res.code(404).send('No data') : res.json(employees);
    }
    catch (err) {
        res
            .code(500)
            .send(err);
    }
})

export default router;