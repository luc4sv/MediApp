import { PrescriptionRepository } from '../repositories/PrescriptionRepository.js';

const getAllPrescriptions = async () => {
    return await PrescriptionRepository.findAllPrescriptions();
}

const getPrescriptionById = async (id) => {
    return await PrescriptionRepository.findPrescriptionById(id);
}

const createPrescription = async (data) => {
    return await PrescriptionRepository.savePrescription(data);
}

const updatePrescription = async (id, data) => {
    return await PrescriptionRepository.updatePrescription(id, data);
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

const prescriptionService = {
    getAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
}

export default prescriptionService;