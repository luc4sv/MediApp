import { PacientRepository } from "../repositories/PacientRepository";

const getAllPacients = async () => {
    return await PacientRepository.findAllPacients();
}

const getPacientById = async (id) => {
    return await PacientRepository.findPacientById(id);    
}

const createPacient = async (data) => {
    return await PacientRepository.savePacient(data);
}

const updatePacient = async (id, data) => {
    return await PacientRepository.updatePacient(id, data);
}

async function deletePacient(id) {
    return await PacientRepository.deletePacient(id);
}

const pacientService = {
    getAllPacients,
    getPacientById,
    createPacient,
    updatePacient,
    deletePacient
}; 

export default pacientService;