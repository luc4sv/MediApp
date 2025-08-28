import { Mongoose } from "mongoose";

const schema = Mongoose.Schema

const pacientSchema = new schema({
    pacientId: {
        type: String,
        required: [true, 'Pacient ID is required']
    },
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
        required: [true, 'Email is required']
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

const pacient = Mongoose.model('Pacient', pacientSchema);

export { pacient };