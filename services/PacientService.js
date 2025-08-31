import PacientRepository from "../repositories/PacientRepository.js";

const getAllPacients = async () => {
    return await PacientRepository.findAllPacients();
}

const getPacientById = async (id) => {
    return await PacientRepository.findPacientById(id);    
}

const savePacient = async ({ name, birthDate, email, phone }) => {
    return await PacientRepository.savePacient({ name, birthDate, email, phone });
}

const updatePacient = async ({ name, birthDate, email, phone }) => {
    return await PacientRepository.updatePacient({ name, birthDate, email, phone });
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