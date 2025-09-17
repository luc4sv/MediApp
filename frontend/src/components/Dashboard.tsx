import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Calendar, FileText, TrendingUp, Clock, UserCheck } from 'lucide-react';
import { Badge } from './ui/badge';

export function Dashboard() {
  const stats = [
    {
      title: 'Total de Pacientes',
      value: '247',
      icon: Users,
      trend: '+12% desde o mês passado',
      color: 'text-blue-600'
    },
    {
      title: 'Consultas Hoje',
      value: '18',
      icon: Calendar,
      trend: '3 pendentes',
      color: 'text-green-600'
    },
    {
      title: 'Prescrições Emitidas',
      value: '156',
      icon: FileText,
      trend: '+8% esta semana',
      color: 'text-purple-600'
    },
    {
      title: 'Taxa de Comparecimento',
      value: '94%',
      icon: TrendingUp,
      trend: '+2% este mês',
      color: 'text-orange-600'
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: 'Ana Silva',
      doctor: 'Dr. João Santos',
      time: '09:00',
      status: 'confirmado',
      type: 'Consulta'
    },
    {
      id: 2,
      patient: 'Carlos Oliveira',
      doctor: 'Dra. Maria Costa',
      time: '10:30',
      status: 'em-andamento',
      type: 'Retorno'
    },
    {
      id: 3,
      patient: 'Beatriz Lima',
      doctor: 'Dr. Pedro Alves',
      time: '14:00',
      status: 'agendado',
      type: 'Consulta'
    },
    {
      id: 4,
      patient: 'Roberto Ferreira',
      doctor: 'Dra. Sandra Moura',
      time: '15:30',
      status: 'agendado',
      type: 'Exame'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case 'em-andamento':
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      case 'agendado':
        return <Badge className="bg-gray-100 text-gray-800">Agendado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do consultório - {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Consultas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{appointment.patient}</span>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor} • {appointment.type}
                    </p>
                  </div>
                  <div className="text-sm font-medium">{appointment.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="size-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <Users className="size-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Novo Paciente</div>
                  <div className="text-sm text-muted-foreground">Cadastrar paciente</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <Calendar className="size-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Agendar Consulta</div>
                  <div className="text-sm text-muted-foreground">Nova consulta</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <FileText className="size-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Emitir Prescrição</div>
                  <div className="text-sm text-muted-foreground">Nova prescrição</div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}