import { Prescription } from '../models/Prescription.js';

const getAllPrescriptions = async () => {
    return await Prescription.find();
}

const getPrescriptionById = async (id) => {
    try { 
        return await Prescription.findById(id);
    } catch (error) {
        console.error('Error fetching prescription by ID:', error);
        throw error;
    }
}

const createPrescription = async (data) => {
    try {
        const newPrescription = new Prescription(data);
        return await newPrescription.save();
    } catch (error) {
        console.error('Error creating prescription:', error);
        throw error;
    }
}

const updatePrescription = async (id, data) => {
    try {
        const prescription = await Prescription.findById(id);
        if (prescription) {
            Object.assign(prescription, data);
            return await prescription.save();
        }
        return null;
    } catch (error) {
        console.error('Error updating prescription:', error);
        throw error;
    }
}

const deletePrescription = async (id) => {
    try {
        const prescription = await Prescription.findById(id);
        if (prescription) {
            await prescription.remove();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting prescription:', error);
        throw error;
    }
}

const prescriptionRepository = {
    getAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
};

export default prescriptionRepository;