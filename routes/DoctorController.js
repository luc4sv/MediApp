import express from 'express';
import bcrypt from 'bcrypt';
import DoctorService from '../services/DoctorService.js';

let router = express.Router();

router.get('/doctors', async (req, res) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

router.get('/getDoctor/:id', async (req, res) => {
    try {
        const doctor = await DoctorService.getDoctorById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctor' });
    }
});

router.post('/createDoctor', async (req, res) => {
    try {
        const { name, medicalSpecialty, login, password, medicalRegistration, email, phone } = req.body;
        const newDoctor = await DoctorService.saveDoctor(name, medicalSpecialty, login, password, medicalRegistration, email, phone);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create doctor' });
    }
});

router.put('/updateDoctor/:id', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { name, medicalSpecialty, login, password, medicalRegistration, email, phone } = req.body;
        const updatedDoctor = await DoctorService.updateDoctor(req.params.id, { name, medicalSpecialty, login, password, medicalRegistration, email, phone });
        if (updatedDoctor) {
            res.json(updatedDoctor);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update doctor' });
    }
});

router.delete('/deleteDoctor/:id', async (req, res) => {
    try {
        const deletedDoctor = await DoctorService.deleteDoctor(req.params.id);
        if (deletedDoctor) {
            res.json({ message: 'Doctor deleted successfully' });
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete doctor' });
    }
});

export default router;