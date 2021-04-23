import mongoose from 'mongoose';

const attendaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nip: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "WFO",
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

const Attendance = mongoose.model('attendance', attendaceSchema);

export default Attendance;