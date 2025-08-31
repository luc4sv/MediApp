import { mongoose }  from "mongoose";   

const schema = mongoose.Schema

const appointmentSchema = new schema({
        date: {
         type: Date, 
         required: [true, 'Date is required']
        },
        doctorId: {
            type: String,
            required: [true, 'Doctor ID is required']
        },
        patientId: {
            type: String,
            required: [true, 'Patient ID is required']
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
},
);

const appointment = mongoose.model('Appointment', appointmentSchema);

export default { appointment };