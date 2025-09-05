import PatientRepository from "../repositories/PatientRepository.js";

const getAllPatients = async () => {
    return await PatientRepository.getAllPatients();
}

const getPatientById = async (id) => {
    return await PatientRepository.getPatientById(id);    
}

async function savePatient({ name, birthDate, email, phone }) {
    return await PatientRepository.savePatient({ name, birthDate, email, phone });
  }

const updatePatient = async (id, { name, birthDate, email, phone }) => {
    return await PatientRepository.updatePatient(id, { name, birthDate, email, phone });
}

async function deletePatient(id) {
    return await PatientRepository.deletePatient(id);
}

const PatientService = {
    getAllPatients,
    getPatientById,
    savePatient,
    updatePatient,
    deletePatient
}; 

export default PatientService;