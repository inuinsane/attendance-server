import User from '../models/User.js';
import Employee from '../models/Employee.js';

export const createUser = async (req, res) => {
    try {
        const {
            name,
            jabatan,
            nip,

        } = req.body;

        const newEmployee = new Employee({
            name, nip, jabatan
        });
        // res.json(newEmployee);

        const savedEmployee = await newEmployee.save();
        res.json({
            message: 'Data berhasil disimpan',
            savedEmployee
        }).status(201);
    }
    catch (err) {
        res
            .status(500)
            .send(err);
    }
}