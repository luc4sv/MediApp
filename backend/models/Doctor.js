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
            required: [true, 'Phone number is required'],
            validator: function(v) {
                return /\d{2} 9\d{4} - \d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Format should be XX 9XXXX - XXXX`
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
},
);

const doctor = mongoose.model('Doctor', doctorSchema);

export default doctor;