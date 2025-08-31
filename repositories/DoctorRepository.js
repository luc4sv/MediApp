import Doctor from '../models/Doctor.js';

const getAllDoctors = async () => {
    return await Doctor.findAll();
}

const getDoctorById = async (id) => {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        throw error;
    }
}

const saveDoctor = async ({ name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {
    try {
        const newDoctor = new Doctor({ name, login, password, medicalSpecialty, medicalRegistration, email, phone });
        return await newDoctor.save();
    } catch (error) {
        console.error('Error saving doctor:', error);
        throw error;
    }
}

const updateDoctor = async (id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {
    try {
        return await Doctor.findByIdAndUpdate(id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone }, { new: true });
   } catch (error) {
        console.error('Error updating doctor:', error);
        throw error;
   }
}

const deleteDoctor = async (id) => {
    try {
        return await Doctor.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting doctor:', error);
        throw error;
    }
}

const doctorRepository = {
    getAllDoctors,
    getDoctorById,
    saveDoctor,
    updateDoctor,
    deleteDoctor
};

export default  doctorRepository;