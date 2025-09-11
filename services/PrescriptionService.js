import PrescriptionRepository from '../repositories/PrescriptionRepository.js';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import AppointmentService from './AppointmentService.js';
import DoctorService from './DoctorService.js';
import PatientService from './PatientService.js';


const getAllPrescriptions = async () => {
    return await PrescriptionRepository.findAllPrescriptions();
}

const getPrescriptionById = async (id) => {
    return await PrescriptionRepository.findPrescriptionById(id);
}

async  function savePrescription(prescriptionData) {
    return await PrescriptionRepository.savePrescription(prescriptionData);
}

const updatePrescription = async (id, prescriptionData) => {
    return await PrescriptionRepository.updatePrescription(id, prescriptionData);
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

const gerenatePrescriptionFile = async (prescription) => {
    const appointment = await AppointmentService.getAppointmentById(prescription.appointmentId);
    const doctor = await DoctorService.getDoctorById(appointment.doctorId);
    const patient = await PatientService.getPatientById(appointment.patientId);

    const id = prescription.id;
    const document = new PDFDocument({font: 'Helvetica'});
    const filePath = "./prescriptions/prescription_" + id + ".pdf";
    document.pipe(fs.createWriteStream(filePath));
    document.fontSize(16).text('Prescription', {align: 'center'});
    document.fontSize(12).text(`Patient Name:  ${patient.name}`);
    document.fontSize(12).text(`Doctor Name:  ${doctor.name}`);

    const recipe = "Medicine " + prescription.medicine + "\n" +
                     "Dosage: " + prescription.dosage + "\n" +
                     "Instructions: " + prescription.instructions + "\n";
    document.moveDown().fontSize(12).text(recipe);
    document.end();
    return prescription;
}


const prescriptionService = {
    getAllPrescriptions,
    getPrescriptionById,
    savePrescription,
    updatePrescription,
    deletePrescription,
    gerenatePrescriptionFile
}

export default prescriptionService;