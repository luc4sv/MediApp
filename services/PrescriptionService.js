import PrescriptionRepository from '../repositories/PrescriptionRepository.js';

const getAllPrescriptions = async () => {
    return await PrescriptionRepository.findAllPrescriptions();
}

const getPrescriptionById = async (id) => {
    return await PrescriptionRepository.findPrescriptionById(id);
}

async  function savePrescription(prescriptionData) {
    return await PrescriptionRepository.savePrescription(prescriptionData);
}

const updatePrescription = async (id, prescriptionData) => {
    return await PrescriptionRepository.updatePrescription(id, prescriptionData);
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

const prescriptionService = {
    getAllPrescriptions,
    getPrescriptionById,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default prescriptionService;