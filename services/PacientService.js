import PacientRepository from "../repositories/PacientRepository.js";

const getAllPacients = async () => {
    return await PacientRepository.getAllPacients();
}

const getPacientById = async (id) => {
    return await PacientRepository.getPacientById(id);    
}

const savePacient = async ({ name, birthDate, email, phone }) => {
    return await PacientRepository.savePacient({ name, birthDate, email, phone });
}

const updatePacient = async (id, pacientData) => {
    return await PacientRepository.updatePacient(id, pacientData);
}

async function deletePacient(id) {
    return await PacientRepository.deletePacient(id);
}

const pacientService = {
    getAllPacients,
    getPacientById,
    savePacient,
    updatePacient,
    deletePacient
}; 

export default pacientService;