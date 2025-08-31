import express from 'express';
import PacientService from '../services/PacientService.js';

let router = express.Router();  

router,get('/pacients', async (req, res) => {
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

router.post('/createPacient', async (req, res) => {
    try {
        const { name, birthDate, email, phone } = req.body;
        const newPacient = await PacientService.createPacient({ name, birthDate, email, phone });
        res.status(201).json(newPacient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create pacient' });
    }
});

router.put('/updatePacient/:id', async (req, res) => {
    try {
        const { name, birthDate, email, phone } = req.body;
        const updatedPacient = await PacientService.updatePacient(req.params.id, { name, birthDate, email, phone });
        if (updatedPacient) {
            res.json(updatedPacient);
        } else {
            res.status(404).json({ error: 'Pacient not found' });
        }
    } catch (error) {
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