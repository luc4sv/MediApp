import { Pacient } from '../models/Pacient.js';

const findAllPacients = async () => {
    return await Pacient.findAll();
}

const findPacientById = async (id) => {
    try {
        return await Pacient.findById(id);
    } catch (error) {
        console.error('Error fetching pacient by ID:', error);
        throw error;
    }
}

const savePacient = async (data) => {
    try {
        const newPacient = new Pacient(data);
        return await newPacient.save();
    } catch (error) {
        console.error('Error saving pacient:', error);
        throw error;
    }
}

const updatePacient = async (id, data) => {
    try {
        const pacient = await Pacient.findById(id);
        if (pacient) {
            await pacient.update(data);
            return pacient;
        }
        return null;
    } catch (error) {
        console.error('Error updating pacient:', error);
        throw error;
    }
}

const deletePacient = async (id) => {
    try {
        const pacient = await Pacient.findById(id);
        if (pacient) {
            await pacient.destroy();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting pacient:', error);
        throw error;
    }
}

const pacientRepository = {
    findAllPacients,
    findPacientById,
    savePacient,
    updatePacient,
    deletePacient
};

export default pacientRepository;