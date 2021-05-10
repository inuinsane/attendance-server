import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    nip: {
        type: String,
        required: true,
    },
    bagian: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    photo: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    status: {
        type: String,
        required: true,
        default: 'hadir',
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        enum: ['employee', 'admin'],
        default: 'employee',
    }
});

const User = mongoose.model('user', userSchema);

export default User;