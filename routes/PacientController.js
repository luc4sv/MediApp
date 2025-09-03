import express from 'express';
import PacientService from '../services/PacientService.js';

let router = express.Router();  

router.get('/pacients', async (req, res) => {
    try {
        const pacients = await PacientService.getAllPacients();
        res.json(pacients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pacients' });
    }
});

router.get('/getPacient/:id', async (req, res) => {
    try {
        const pacient = await PacientService.getPacientById(req.params.id);
        if (pacient) {
            res.json(pacient);
        } else {
            res.status(404).json({ error: 'Pacient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pacient' });
    }
});

router.post("/postPacient", async function(req, res){
    const { name, birthDate, email, phone } = req.body;
    try{
        const pacient = await PacientService.savePacient({ name, birthDate, email, phone });
        res.send(pacient);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put('/updatePacient/:id', async (req, res) => {
    try {
        const updatedPacient = await PacientService.updatePacient(req.params.id, req.body);
        if (updatedPacient) {
            res.json(updatedPacient);
        } else {
            res.status(404).json({ error: 'Pacient not found' });
        }
    } catch (error) {
        console.error("Failed to update pacient:", error);
        res.status(500).json({ error: 'Failed to update pacient' });
    }
});

router.delete('/deletePacient/:id', async (req, res) => {
    try {
        const deletedPacient = await PacientService.deletePacient(req.params.id);
        if (deletedPacient) {
            res.json({ message: 'Pacient deleted successfully' });
        } else {
            res.status(404).json({ error: 'Pacient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete pacient' });
    }
});

export default router;