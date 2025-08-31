import { mongoose } from "mongoose";

const schema = mongoose.Schema

const pacientSchema = new schema({
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
        required: [true, 'Phone number is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
);

const pacient = mongoose.model('Pacient', pacientSchema);

export { pacient };