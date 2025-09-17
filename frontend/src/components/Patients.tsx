import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Edit, Eye, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-9999',
      birthDate: '1985-03-15',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      bloodType: 'O+',
      allergies: 'Penicilina',
      emergencyContact: 'João Silva - (11) 88888-8888',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      phone: '(11) 77777-7777',
      birthDate: '1990-07-22',
      address: 'Av. Paulista, 456 - São Paulo, SP',
      bloodType: 'A+',
      allergies: 'Nenhuma',
      emergencyContact: 'Maria Oliveira - (11) 66666-6666',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Beatriz Lima',
      email: 'beatriz.lima@email.com',
      phone: '(11) 55555-5555',
      birthDate: '1978-12-03',
      address: 'Rua da Consolação, 789 - São Paulo, SP',
      bloodType: 'B-',
      allergies: 'Aspirina, Pólen',
      emergencyContact: 'Pedro Lima - (11) 44444-4444',
      status: 'inativo'
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    bloodType: '',
    allergies: '',
    emergencyContact: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = () => {
    const patient = {
      id: patients.length + 1,
      ...newPatient,
      status: 'ativo'
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      address: '',
      bloodType: '',
      allergies: '',
      emergencyContact: ''
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
          <h1 className="text-2xl font-semibold">Gerenciamento de Pacientes</h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie os pacientes do consultório
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={newPatient.birthDate}
                    onChange={(e) => setNewPatient({...newPatient, birthDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  placeholder="Rua, número, bairro - Cidade, Estado"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                  <Select onValueChange={(value: any) => setNewPatient({...newPatient, bloodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                  <Input
                    id="emergencyContact"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                    placeholder="Nome - Telefone"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={newPatient.allergies}
                  onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                  placeholder="Liste as alergias conhecidas"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPatient}>
                  Cadastrar Paciente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Tipo Sanguíneo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3" />
                        {patient.address.split(' - ')[1]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {calculateAge(patient.birthDate)} anos
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="size-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="size-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'ativo' ? 'default' : 'secondary'}>
                      {patient.status === 'ativo' ? 'Ativo' : 'Inativo'}
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