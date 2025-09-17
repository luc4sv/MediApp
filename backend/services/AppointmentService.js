import AppointmentRepository  from '../repositories/AppointmentRepository.js';

const getAllAppointments = async () => {
    return await AppointmentRepository.getAllAppointments();
}

const getAppointmentById = async (id) => {
    return await AppointmentRepository.getAppointmentById(id);
}

const saveAppointment = async (date, doctorId, patientId) => {
    return await AppointmentRepository.saveAppointment(date, doctorId, patientId);
}

const updateAppointment = async (id, {date, doctorId, patientId}) => {
    return await AppointmentRepository.updateAppointment(id, {date, doctorId, patientId});
}

async function deleteAppointment(id) {
    return await AppointmentRepository.deleteAppointment(id);
}

const appointmentService = {
    getAllAppointments,
    getAppointmentById,
    saveAppointment,
    updateAppointment,
    deleteAppointment
};

export default appointmentService;