import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nip: {
        type: String,
        required: true,
    },
    jabatan: {
        type: String,
        required: true,
    }
});

const Employee = mongoose.model('employee', employeeSchema);

export default Employee;