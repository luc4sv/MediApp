import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Edit, Eye, FileText, Pill, Clock, User, Download, Printer } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'Ana Silva',
      doctorId: 1,
      doctorName: 'Dr. João Santos',
      date: '2024-01-15',
      medications: [
        {
          name: 'Paracetamol 500mg',
          dosage: '1 comprimido',
          frequency: 'A cada 8 horas',
          duration: '7 dias',
          instructions: 'Tomar após as refeições'
        },
        {
          name: 'Ibuprofeno 400mg',
          dosage: '1 comprimido',
          frequency: 'A cada 12 horas',
          duration: '5 dias',
          instructions: 'Tomar com alimentos'
        }
      ],
      diagnosis: 'Cefaleia tensional',
      observations: 'Retornar em caso de piora dos sintomas',
      status: 'ativa'
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Carlos Oliveira',
      doctorId: 2,
      doctorName: 'Dra. Maria Costa',
      date: '2024-01-14',
      medications: [
        {
          name: 'Amoxicilina 500mg',
          dosage: '1 cápsula',
          frequency: 'A cada 8 horas',
          duration: '10 dias',
          instructions: 'Tomar mesmo que os sintomas melhorem'
        }
      ],
      diagnosis: 'Infecção respiratória',
      observations: 'Manter repouso e hidratação',
      status: 'ativa'
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Beatriz Lima',
      doctorId: 1,
      doctorName: 'Dr. João Santos',
      date: '2024-01-10',
      medications: [
        {
          name: 'Omeprazol 20mg',
          dosage: '1 cápsula',
          frequency: 'Uma vez ao dia',
          duration: '30 dias',
          instructions: 'Tomar em jejum, 30 min antes do café'
        }
      ],
      diagnosis: 'Gastrite',
      observations: 'Evitar alimentos condimentados e ácidos',
      status: 'finalizada'
    }
  ]);

  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    observations: '',
    medications: [
      {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }
    ]
  });

  const patients = [
    { id: 1, name: 'Ana Silva' },
    { id: 2, name: 'Carlos Oliveira' },
    { id: 3, name: 'Beatriz Lima' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. João Santos', crm: 'CRM 123456' },
    { id: 2, name: 'Dra. Maria Costa', crm: 'CRM 234567' },
    { id: 3, name: 'Dr. Pedro Alves', crm: 'CRM 345678' }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    });
  };

  const removeMedication = (index: number) => {
    const medications = newPrescription.medications.filter((_, i) => i !== index);
    setNewPrescription({ ...newPrescription, medications });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const medications = [...newPrescription.medications];
    medications[index] = { ...medications[index], [field]: value };
    setNewPrescription({ ...newPrescription, medications });
  };

  const handleAddPrescription = () => {
    const patient = patients.find(p => p.id === parseInt(newPrescription.patientId));
    const doctor = doctors.find(d => d.id === parseInt(newPrescription.doctorId));
    
    if (patient && doctor) {
      const prescription = {
        id: prescriptions.length + 1,
        ...newPrescription,
        patientId: parseInt(newPrescription.patientId),
        doctorId: parseInt(newPrescription.doctorId),
        patientName: patient.name,
        doctorName: doctor.name,
        date: new Date().toISOString().split('T')[0],
        status: 'ativa'
      };
      setPrescriptions([...prescriptions, prescription]);
      setNewPrescription({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        observations: '',
        medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
      });
      setIsAddDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa':
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>;
      case 'finalizada':
        return <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>;
      case 'cancelada':
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Prescrições Médicas</h1>
          <p className="text-muted-foreground">
            Emita e gerencie prescrições médicas
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Nova Prescrição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Emitir Nova Prescrição</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select onValueChange={(value: any) => setNewPrescription({...newPrescription, patientId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Médico</Label>
                  <Select onValueChange={(value: any) => setNewPrescription({...newPrescription, doctorId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          {doctor.name} - {doctor.crm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico</Label>
                <Input
                  id="diagnosis"
                  value={newPrescription.diagnosis}
                  onChange={(e) => setNewPrescription({...newPrescription, diagnosis: e.target.value})}
                  placeholder="Digite o diagnóstico"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medicamentos</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                    <Plus className="size-4 mr-2" />
                    Adicionar Medicamento
                  </Button>
                </div>
                
                {newPrescription.medications.map((medication, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Medicamento {index + 1}</h4>
                        {newPrescription.medications.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeMedication(index)}
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome do Medicamento</Label>
                          <Input
                            value={medication.name}
                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            placeholder="Ex: Paracetamol 500mg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Dosagem</Label>
                          <Input
                            value={medication.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            placeholder="Ex: 1 comprimido"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Frequência</Label>
                          <Input
                            value={medication.frequency}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            placeholder="Ex: A cada 8 horas"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duração</Label>
                          <Input
                            value={medication.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                            placeholder="Ex: 7 dias"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Instruções</Label>
                        <Textarea
                          value={medication.instructions}
                          onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                          placeholder="Ex: Tomar após as refeições"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={newPrescription.observations}
                  onChange={(e) => setNewPrescription({...newPrescription, observations: e.target.value})}
                  placeholder="Observações adicionais e orientações gerais"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPrescription}>
                  Emitir Prescrição
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Prescrições</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Buscar por paciente, médico ou diagnóstico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Prescrições ({filteredPrescriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead>Medicamentos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-muted-foreground" />
                      {prescription.patientName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground" />
                      {prescription.doctorName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      {new Date(prescription.date).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{prescription.diagnosis}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Pill className="size-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{prescription.medications.length} medicamento(s)</div>
                        <div className="text-sm text-muted-foreground">
                          {prescription.medications[0]?.name}
                          {prescription.medications.length > 1 && ' +' + (prescription.medications.length - 1)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(prescription.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}