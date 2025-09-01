import mongoose from "mongoose";   

const schema = mongoose.Schema

const doctorSchema = new schema({
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        medicalSpecialty: {
            type: String,
            required: [true, 'Medical Specialty is required']
        },
        login: {
            type: String,
            required: [true, 'Login is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        medicalRegistration: {
            type: String,
            required: [true, 'Medical Registration Number is required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
},
);

const doctor = mongoose.model('Doctor', doctorSchema);

export default doctor;