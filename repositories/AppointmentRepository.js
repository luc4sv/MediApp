import Appointment from '../models/Appointment.js';

const  getAllAppointments = async () => {
    return await Appointment.find();
}

const getAppointmentById = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        throw error;
    }
}

const saveAppointment = async (date, doctorId, patientId) => {
    try {
        const newAppointment = new Appointment({ date, doctorId, patientId });
        return await newAppointment.save();
    } catch (error) {   
        console.error('Error saving appointment:', error);
        throw error;
    }
}

const updateAppointment = async (id, {date, doctorId, patientId}) => {
    try {
        return await Appointment.findByIdAndUpdate(id, {date, doctorId, patientId}, { new: true });
   } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
   }
}

const deleteAppointment = async (id) => {
    try {
        return await Appointment.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

const appointmentRepository = {
    getAllAppointments,
    getAppointmentById,
    saveAppointment,
    updateAppointment,
    deleteAppointment
};

export default appointmentRepository;