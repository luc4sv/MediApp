import express from 'express';
import AppointmentService from '../services/AppointmentService.js';

let router = express.Router();  

router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch appointments' });
    }
});

router.get('/getAppointments/:id', async (req, res) => {
    try {
        const appointment = await AppointmentService.getAppointmentById(req.params.id);
        if (appointment) {
            res.status(200).send(appointment);
        } else {
            res.status(404).send({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch appointment' });
    }
});

router.post('/createAppointment', async (req, res) => {
    try {
        const { date, doctorId, pacientId } = req.body;
        const newAppointment = await AppointmentService.saveAppointment(date, doctorId, pacientId);
        res.status(201).send(newAppointment);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create appointment' });
    }
});

router.put('/updateAppointment/:id', async (req, res) => {
    try {
        const { date, doctorId, pacientId } = req.body;
        const updatedAppointment = await AppointmentService.updateAppointment(req.params.id, { date, doctorId, pacientId });
        if (updatedAppointment) {
            res.status(200).send(updatedAppointment);
        } else {
            res.status(404).send({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update appointment' });
    }
});

router.delete('/deleteAppointment/:id', async (req, res) => {
    try {
        const deletedAppointment = await AppointmentService.deleteAppointment(req.params.id);
        if (deletedAppointment) {
            res.status(200).send({ message: 'Appointment deleted successfully' });
        } else {
            res.status(404).send({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete appointment' });
    }
}); 

export default router;