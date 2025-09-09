import mongoose  from "mongoose";   

const schema = mongoose.Schema

const appointmentSchema = new schema({
        date: {
         type: Date, 
         required: [true, 'Date is required']
        },
        doctorId: {
            type: String,
            required: [true, 'Doctor ID is required'],
            validate: {
                validator: function(v) {
                    const id = mongoose.Types.ObjectId.isValid(v);
                    return Doctor.exists({_id: id});
                },
                message: props =>
                `DoctorID ${props.value} does not exist`
            }   
        },
        patientId: {
            type: String,
            required: [true, 'Patient ID is required'],
            validate: {
                validator: function(v) {
                    const id = mongoose.Types.ObjectId.isValid(v);
                    return Patient.exists({_id: id});
                },
                message: props =>
                `PatientID ${props.value} does not exist`
            }
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
},
);

const appointment = mongoose.model('Appointment', appointmentSchema);

export default appointment;