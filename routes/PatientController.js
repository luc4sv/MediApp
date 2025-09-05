import express from "express";
import PatientService from "../services/PatientService.js";

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await PatientService.getAllPatients();
    res.send(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const patient = await PatientService.getPatientById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient" });
  }
});

router.post ("/", async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;
    const patientData = { name, birthDate, email, phone };
    const newPatient = await PatientService.savePatient(patientData);
    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Failed to create patient:", error);
    res.status(500).json({ error: "Failed to create patient" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await PatientService.updatePatient(
      req.params.id,
      req.body
    );
    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    console.error("Failed to update patient:", error);
    res.status(500).json({ error: "Failed to update patient" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await PatientService.deletePatient(req.params.id);
    if (deletedPatient) {
      res.json({ message: "Patient deleted successfully" });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete patient" });
  }
});

export default router;