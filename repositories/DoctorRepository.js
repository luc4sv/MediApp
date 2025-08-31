import { Doctor } from '../models/Doctor.js';

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

const saveDoctor = async (name, specialty) => {
    try {
        const newDoctor = new Doctor({ name, specialty });
        return await newDoctor.save();
    } catch (error) {   
        console.error('Error saving doctor:', error);
        throw error;
    }
}

const updateDoctor = async (id, {name, specialty}) => {
    try {
        return await Doctor.findByIdAndUpdate(id, {name, specialty}, { new: true });
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