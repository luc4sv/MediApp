import Doctor from '../models/Doctor.js';

const getAllDoctors = async () => {
    return await Doctor.find();
}

const getDoctorById = async (id) => {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        throw error;
    }
}

const saveDoctor = async (doctorData) => {
    try {
        const newDoctor = new Doctor(doctorData);
        const savedDoctor = await newDoctor.save();
        return savedDoctor;
    } catch (error) {
        console.error("ERRO DENTRO DO REPOSITORY (MONGOOSE):", error.message);
        throw error;
    }
};

const updateDoctor = async (id, updateData) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
        return updatedDoctor;
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