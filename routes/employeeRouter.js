import express from 'express';
import { createUser } from '../controllers/UserController.js';
import auth from '../middleware/auth.js';
import Employee from '../models/Employee.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Create new Employee
router.post('/', [auth, admin], createUser);

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