import express  from 'express';
import AppointmentController from './AppointmentController.js';
import DoctorController from './DoctorController.js';
import PatientController from './PatientController.js';
import PrescriptionController from './PrescriptionController.js';
import DoctorService from '../services/DoctorService.js';
import bcrypt from 'bcrypt';
import verifyToken from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.get('/', (req, res) => {
  console.log('Hi');
  res.status(200).send({ message: 'deu bom'});
});

router.post('/login', async (req, res) => {
  try {
        const { login, password } = req.body;
        const doctor = await DoctorService.getDoctorByLogin(login);

    if (!doctor) {
      return res.status(404).send({ error: 'Authentication failed. Doctor not found.' });
    }
    
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign({doctorId: doctor._id}, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token})

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Login Failed' });
  }
});

router.use('/appointments', verifyToken, AppointmentController);
router.use('/doctors', verifyToken, DoctorController);
router.use('/patients', verifyToken, PatientController);
router.use('/prescriptions', verifyToken, PrescriptionController);

export default router;