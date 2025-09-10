import  DoctorRepository from "../repositories/DoctorRepository.js";

const getAllDoctors = async () => {
    return await DoctorRepository.getAllDoctors();
}

const getDoctorById = async (id) => {
    return await DoctorRepository.getDoctorById(id);
}

const saveDoctor = async (doctorData) => {
    return await DoctorRepository.saveDoctor(doctorData);
}

const updateDoctor = async (id, doctorData) => {
    return await DoctorRepository.updateDoctor(id, doctorData);
}

async function deleteDoctor(id) {
    return await DoctorRepository.deleteDoctor(id);
}

const getDoctorByLogin = async (login) => {
    return await DoctorRepository.getDoctorByLogin(login);
}

const doctorService = {
    getAllDoctors,
    getDoctorById,
    saveDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorByLogin
};

export default doctorService;