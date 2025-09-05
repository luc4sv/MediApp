import express  from 'express';
import AppointmentController from './AppointmentController.js';
import DoctorController from './DoctorController.js';
import PatientController from './PatientController.js';
import PrescriptionController from './PrescriptionController.js';

let router = express.Router();

router.get('/', (req, res) => {
  console.log('Hi');
  res.status(200).send({ message: 'deu bom'});
});

router.use('/appointments', AppointmentController);
router.use('/doctors', DoctorController);
router.use('/patients', PatientController);
router.use('/prescriptions', PrescriptionController);

export default router;