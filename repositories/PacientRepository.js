import Pacient from '../models/Pacient.js';

const getAllPacients = async () => {
    return await Pacient.findAll();
}

const getPacientById = async (id) => {
    try {
        return await Pacient.findById(id);
    } catch (error) {
        console.error('Error fetching pacient by ID:', error);
        throw error;
    }
}

const savePacient = async ({ name, birthDate, email, phone }) => {
    try{
        const pacient = new Pacient({ name, birthDate, email, phone });
        return await pacient.save();
    }catch(error){
        console.error("ERRO DENTRO DO REPOSITORY (MONGOOSE):", error.message);
        throw new Error(error);
    }
}

const updatePacient = async (id, pacientData) => {
    try {
        return await Pacient.findByIdAndUpdate(id, pacientData, { new: true });
    } catch (error) {
        console.error('Error updating pacient:', error);
        throw error;
    }
}

const deletePacient = async (id) => {
    try {
        return await Pacient.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting pacient:', error);
        throw error;
    }
}

const pacientRepository = {
    getAllPacients,
    getPacientById,
    savePacient,
    updatePacient,
    deletePacient
};

export default pacientRepository;