import express from 'express';
import PrescriptionService from '../services/PrescriptionService.js';

let router = express.Router();  

router.get('/', async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const { date, appointmentId, medicine, dosage, instructions } = req.body;
        const prescriptionData = { date, appointmentId, medicine, dosage, instructions };
        const newPrescription = await PrescriptionService.savePrescription(prescriptionData);
        res.status(201).json(newPrescription);
    } catch (error) {
        console.error('Failed to create prescription:', error);
        res.status(500).json({ error: 'Failed to create prescription' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { date, appointmentId, medicine, dosage, instructions } = req.body;
        const prescriptionData = { date, appointmentId, medicine, dosage, instructions };
        const updatedPrescription = await PrescriptionService.updatePrescription(req.params.id, prescriptionData);
        if (updatedPrescription) {
            res.json(updatedPrescription);
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        console.error('Failed to update prescription:', error);
        res.status(500).json({ error: 'Failed to update prescription' });
    }
});

router.delete('/:id', async (req, res) => {
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