import express from 'express';
import PrescriptionService from '../services/PrescriptionService.js';

let router = express.Router();  

router.get('/prescriptions', async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
});

router.get('/getPrescription/:id', async (req, res) => {
    try {
        const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
        if (prescription) {
            res.json(prescription);
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
});

router.post('/savePrescription', async (req, res) => {
    try {
        const { date, appointmentId, medicine, dosage, instructions } = req.body;
        const newPrescription = await PrescriptionService.createPrescription({ date, appointmentId, medicine, dosage, instructions });
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create prescription' });
    }
});

router.put('/updatePrescription/:id', async (req, res) => {
    try {
        const { date, appointmentId, medicine, dosage, instructions } = req.body;
        const updatedPrescription = await PrescriptionService.updatePrescription(req.params.id, { date, appointmentId, medicine, dosage, instructions });
        if (updatedPrescription) {
            res.json(updatedPrescription);
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update prescription' });
    }
});

router.delete('/deletePrescription/:id', async (req, res) => {
    try {
        const deletedPrescription = await PrescriptionService.deletePrescription(req.params.id);
        if (deletedPrescription) {
            res.json({ message: 'Prescription deleted successfully' });
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete prescription' });
    }
});

export default router;