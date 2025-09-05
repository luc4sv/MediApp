import Patient from '../models/Patient.js';

const getAllPatients = async () => {
    return await Patient.find();
}

const getPatientById = async (id) => {
    try {
        return await Patient.findById(id);
    } catch (error) {
        console.error('Error fetching Patient by ID:', error);
        throw error;
    }
}

const savePatient = async (patientData) => {
    try {
        const newPatient = new Patient(patientData);
        const savedPatient = await newPatient.save();
        return savedPatient;
    } catch (error) {
        console.error("Error saving Patient:", error);
        throw error;
    }
}

const updatePatient = async (id, patientData) => {
    try {
        return await Patient.findByIdAndUpdate(id, patientData, { new: true });
    } catch (error) {
        console.error('Error updating Patient:', error);
        throw error;
    }
}

const deletePatient = async (id) => {
    try {
        return await Patient.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting Patient:', error);
        throw error;
    }
}

const PatientRepository = {
    getAllPatients,
    getPatientById,
    savePatient,
    updatePatient,
    deletePatient
};

export default PatientRepository;