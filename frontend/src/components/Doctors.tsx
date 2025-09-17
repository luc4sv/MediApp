import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Edit, Eye, Phone, Mail, User, Award, Calendar, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. João Santos',
      email: 'joao.santos@mediapp.com',
      phone: '(11) 99999-1111',
      crm: 'CRM 123456',
      specialty: 'Clínico Geral',
      birthDate: '1975-05-20',
      address: 'Rua das Clínicas, 100 - São Paulo, SP',
      workSchedule: 'Segunda a Sexta: 08:00 - 18:00',
      experience: '15 anos',
      qualifications: 'Graduação em Medicina - USP, Residência em Clínica Médica',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Dra. Maria Costa',
      email: 'maria.costa@mediapp.com',
      phone: '(11) 99999-2222',
      crm: 'CRM 234567',
      specialty: 'Pediatria',
      birthDate: '1980-08-15',
      address: 'Av. Brigadeiro, 200 - São Paulo, SP',
      workSchedule: 'Segunda a Quinta: 09:00 - 17:00',
      experience: '12 anos',
      qualifications: 'Graduação em Medicina - UNIFESP, Residência em Pediatria',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Dr. Pedro Alves',
      email: 'pedro.alves@mediapp.com',
      phone: '(11) 99999-3333',
      crm: 'CRM 345678',
      specialty: 'Cardiologia',
      birthDate: '1970-03-10',
      address: 'Rua Cardoso, 300 - São Paulo, SP',
      workSchedule: 'Terça e Quinta: 14:00 - 20:00',
      experience: '20 anos',
      qualifications: 'Graduação em Medicina - FMUSP, Residência em Cardiologia - InCor',
      status: 'ativo'
    }
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
    specialty: '',
    birthDate: '',
    address: '',
    workSchedule: '',
    experience: '',
    qualifications: ''
  });

  const specialties = [
    'Clínico Geral',
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Gastroenterologia',
    'Ginecologia',
    'Neurologia',
    'Oftalmologia',
    'Ortopedia',
    'Otorrinolaringologia',
    'Pediatria',
    'Pneumologia',
    'Psiquiatria',
    'Urologia'
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.crm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    const doctor = {
      id: doctors.length + 1,
      ...newDoctor,
      status: 'ativo'
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({
      name: '',
      email: '',
      phone: '',
      crm: '',
      specialty: '',
      birthDate: '',
      address: '',
      workSchedule: '',
      experience: '',
      qualifications: ''
    });
    setIsAddDialogOpen(false);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Gerenciamento de Médicos</h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie os médicos do consultório
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Novo Médico
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Médico</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newDoctor.phone}
                    onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input
                    id="crm"
                    value={newDoctor.crm}
                    onChange={(e) => setNewDoctor({...newDoctor, crm: e.target.value})}
                    placeholder="CRM 123456"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Select onValueChange={(value: any) => setNewDoctor({...newDoctor, specialty: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={newDoctor.birthDate}
                    onChange={(e) => setNewDoctor({...newDoctor, birthDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newDoctor.address}
                  onChange={(e) => setNewDoctor({...newDoctor, address: e.target.value})}
                  placeholder="Rua, número, bairro - Cidade, Estado"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workSchedule">Horário de Trabalho</Label>
                  <Input
                    id="workSchedule"
                    value={newDoctor.workSchedule}
                    onChange={(e) => setNewDoctor({...newDoctor, workSchedule: e.target.value})}
                    placeholder="Ex: Segunda a Sexta: 08:00 - 18:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiência</Label>
                  <Input
                    id="experience"
                    value={newDoctor.experience}
                    onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                    placeholder="Ex: 10 anos"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualificações</Label>
                <Textarea
                  id="qualifications"
                  value={newDoctor.qualifications}
                  onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
                  placeholder="Formação acadêmica, residências, especializações..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddDoctor}>
                  Cadastrar Médico
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Médicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Buscar por nome, email, especialidade ou CRM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="size-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{doctor.crm}</p>
                  </div>
                </div>
                <Badge variant="outline">{doctor.status === 'ativo' ? 'Ativo' : 'Inativo'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{doctor.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="text-sm">{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="text-sm">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground" />
                  <span className="text-sm">{doctor.workSchedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm">{calculateAge(doctor.birthDate)} anos • {doctor.experience}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {doctor.qualifications}
                </p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="size-4 mr-2" />
                  Ver Perfil
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="size-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Doctors Table (Alternative view) */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Médicos ({filteredDoctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Médico</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="size-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {calculateAge(doctor.birthDate)} anos • {doctor.experience}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doctor.specialty}</Badge>
                  </TableCell>
                  <TableCell>{doctor.crm}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="size-3" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="size-3" />
                        {doctor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{doctor.workSchedule}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={doctor.status === 'ativo' ? 'default' : 'secondary'}>
                      {doctor.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="size-4" />
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