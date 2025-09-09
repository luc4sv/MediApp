import mongoose from "mongoose";

const schema = mongoose.Schema

const patientSchema = new schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth Date is required']
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

const patient = mongoose.model('Patient', patientSchema);

export default patient;