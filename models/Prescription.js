import { Mongoose } from "mongoose";
import { appointment } from "./Appointment";

const schema = Mongoose.Schema

const prescriptionSchema = new schema({
    Date: {
        type: Date,
        required: [true, 'Date is required']
    },
    appointmentId: {
        type: String,
        required: [true, 'Appointment ID is required'],
        ref: 'Appointment'
    },
    medicine: {
        type: [String],
        required: [true, 'Medications are required']
    },
    dosage: {
        type: String,
        required: [true, 'Dosage is required']
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
);

const prescription = Mongoose.model('Prescription', prescriptionSchema);

export { prescription };