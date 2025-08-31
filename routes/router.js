import express  from 'express';
import appointmenteController from '../controllers/appointmentController.js';
import doctorController from '../controllers/doctorController.js';
import pacientController from '../controllers/pacientController.js';
import prescriptionController from '../controllers/prescriptionController.js';

let router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello, World!');
  res.status(200).send({ message: 'deu bom'});
});

router.use('/', pacientController);
router.use('/', doctorController);
router.use('/', appointmenteController);
router.use('/', prescriptionController);

export default router;  