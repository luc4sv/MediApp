import { DoctorRepository } from "../repositories/DoctorRepository";

const getAllDoctors = async () => {
    return await DoctorRepository.getAllDoctors();
}

const getDoctorById = async (id) => {
    return await DoctorRepository.getDoctorById(id);
}

const saveDoctor = async (name, specialty) => {
    return await DoctorRepository.saveDoctor(name, specialty);
}

const updateDoctor = async (id, {name, specialty}) => {
    return await DoctorRepository.updateDoctor(id, {name, specialty});
}

async function deleteDoctor(id) {
    return await DoctorRepository.deleteDoctor(id);
}

const doctorService = {
    getAllDoctors,
    getDoctorById,
    saveDoctor,
    updateDoctor,
    deleteDoctor
};

export default doctorService;