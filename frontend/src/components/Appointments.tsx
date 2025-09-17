import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Plus, Search, Edit, Clock, User, Stethoscope, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'Ana Silva',
      doctorId: 1,
      doctorName: 'Dr. João Santos',
      date: '2024-01-15',
      time: '09:00',
      duration: 30,
      type: 'Consulta',
      status: 'confirmado',
      notes: 'Consulta de rotina',
      symptoms: 'Dor de cabeça frequente'
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Carlos Oliveira',
      doctorId: 2,
      doctorName: 'Dra. Maria Costa',
      date: '2024-01-15',
      time: '10:30',
      duration: 45,
      type: 'Retorno',
      status: 'em-andamento',
      notes: 'Acompanhamento do tratamento',
      symptoms: 'Melhora dos sintomas'
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Beatriz Lima',
      doctorId: 1,
      doctorName: 'Dr. João Santos',
      date: '2024-01-15',
      time: '14:00',
      duration: 30,
      type: 'Consulta',
      status: 'agendado',
      notes: 'Primeira consulta',
      symptoms: 'Dor nas costas'
    },
    {
      id: 4,
      patientId: 1,
      patientName: 'Ana Silva',
      doctorId: 3,
      doctorName: 'Dr. Pedro Alves',
      date: '2024-01-16',
      time: '08:30',
      duration: 60,
      type: 'Exame',
      status: 'agendado',
      notes: 'Exame cardiológico',
      symptoms: 'Palpitações'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: 30,
    type: '',
    notes: '',
    symptoms: ''
  });

  const patients = [
    { id: 1, name: 'Ana Silva' },
    { id: 2, name: 'Carlos Oliveira' },
    { id: 3, name: 'Beatriz Lima' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. João Santos', specialty: 'Clínico Geral' },
    { id: 2, name: 'Dra. Maria Costa', specialty: 'Pediatra' },
    { id: 3, name: 'Dr. Pedro Alves', specialty: 'Cardiologista' }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate === '' || appointment.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case 'em-andamento':
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      case 'agendado':
        return <Badge className="bg-yellow-100 text-yellow-800">Agendado</Badge>;
      case 'concluido':
        return <Badge className="bg-gray-100 text-gray-800">Concluído</Badge>;
      case 'cancelado':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Consulta':
        return <Stethoscope className="size-4 text-blue-600" />;
      case 'Retorno':
        return <Clock className="size-4 text-green-600" />;
      case 'Exame':
        return <FileText className="size-4 text-purple-600" />;
      default:
        return <Calendar className="size-4" />;
    }
  };

  const handleAddAppointment = () => {
    const patient = patients.find(p => p.id === parseInt(newAppointment.patientId));
    const doctor = doctors.find(d => d.id === parseInt(newAppointment.doctorId));
    
    if (patient && doctor) {
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        patientId: parseInt(newAppointment.patientId),
        doctorId: parseInt(newAppointment.doctorId),
        patientName: patient.name,
        doctorName: doctor.name,
        status: 'agendado'
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        duration: 30,
        type: '',
        notes: '',
        symptoms: ''
      });
      setIsAddDialogOpen(false);
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Agendamento de Consultas</h1>
          <p className="text-muted-foreground">
            Gerencie os agendamentos e consultas do consultório
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Agendar Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nova Consulta</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select onValueChange={(value: any) => setNewAppointment({...newAppointment, patientId: value})}>
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
                  <Select onValueChange={(value: any) => setNewAppointment({...newAppointment, doctorId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Select onValueChange={(value: any) => setNewAppointment({...newAppointment, duration: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue placeholder="30" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Consulta</Label>
                <Select onValueChange={(value: any) => setNewAppointment({...newAppointment, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Retorno">Retorno</SelectItem>
                    <SelectItem value="Exame">Exame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="symptoms">Sintomas/Motivo</Label>
                <Textarea
                  id="symptoms"
                  value={newAppointment.symptoms}
                  onChange={(e) => setNewAppointment({...newAppointment, symptoms: e.target.value})}
                  placeholder="Descreva os sintomas ou motivo da consulta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Observações adicionais"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddAppointment}>
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todas as Consultas</TabsTrigger>
          <TabsTrigger value="today">Hoje ({todayAppointments.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                  <Input
                    placeholder="Buscar por paciente ou médico..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                  <Button variant="outline" onClick={() => setSelectedDate('')}>
                    Limpar Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Consultas ({filteredAppointments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.symptoms}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="size-4 text-muted-foreground" />
                          {appointment.doctorName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time} ({appointment.duration}min)
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appointment.type)}
                          {appointment.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Iniciar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultas de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(appointment.type)}
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.doctorName} • {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(appointment.status)}
                      <Button size="sm">
                        {appointment.status === 'agendado' ? 'Iniciar' : 'Ver Detalhes'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Calendar className="size-12 mx-auto mb-4" />
                <p>Visualização de calendário será implementada aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}