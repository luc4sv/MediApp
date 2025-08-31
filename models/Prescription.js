import { mongoose } from "mongoose";

const schema = mongoose.Schema

const prescriptionSchema = new schema({
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    appointmentId: {
        type: String,
        required: [true, 'Appointment ID is required']
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
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
);

const prescription = mongoose.model('Prescription', prescriptionSchema);

export default { prescription };