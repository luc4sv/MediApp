import express from 'express';
import PrescriptionService from '../services/PrescriptionService.js';
import multer from 'multer';
import process from 'process';
import path from 'path';

let router = express.Router();  

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'prescriptions/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/uploadPrescription/:id', upload.single('file'), async (req, res) => {
    try {

    const { id } = req.params;
    let prescription = await PrescriptionService.getPrescriptionById(id);

    const file = `prescriptions/${req.file.originalname}`;
    prescription = await PrescriptionService.updatePrescription(id, { ...prescription, file });

    return res.status(200).json(prescription);

} catch (error) {
    console.error('Failed to upload prescription file:', error);
    res.status(500).json({ error: 'Failed to upload prescription file' });
}
});

router.get('/readPrescription/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await PrescriptionService.getPrescriptionById(id);
        if (prescription && prescription.file) {
            const filePath = path.join(process.cwd(), prescription.file);
            return res.sendFile(filePath);
        } else {
            return res.status(404).json({ error: 'Prescription file not found' });
        }
    } catch (error) {
        console.error('Failed to read prescription file:', error);
        res.status(500).json({ error: 'Failed to read prescription file' });
    }
});

router.get('/prescriptions', async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
});

router.get('/prescriptions/:id', async (req, res) => {
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

router.post('/createPrescription', async (req, res) => {
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

router.put('/updatePrescription/:id', async (req, res) => {
    try {
        const { date, appointmentId, medicine, dosage, instructions, file } = req.body;
        const prescriptionData = { date, appointmentId, medicine, dosage, instructions, file };
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

router.get('/generate/:id', async (req, res) => {
    try {
        const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
        if (prescription) {
            await PrescriptionService.gerenatePrescriptionFile(prescription);
            res.json({ message: 'Prescription file generated successfully' });
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        console.error('Failed to generate prescription file:', error);
        res.status(500).json({ error: 'Failed to generate prescription file' });
    }
});

export default router;