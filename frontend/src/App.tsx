import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { LayoutDashboard, Users, Calendar, FileText, User, Menu, Stethoscope } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Patients } from './components/Patients';
import { Appointments } from './components/Appointments';
import { Prescriptions } from './components/Prescriptions';
import { Doctors } from './components/Doctors';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <Appointments />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'doctors':
        return <Doctors />;
      default:
        return <Dashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'appointments', label: 'Consultas', icon: Calendar },
    { id: 'prescriptions', label: 'Prescrições', icon: FileText },
    { id: 'doctors', label: 'Médicos', icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="size-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">MediApp</h1>
                <p className="text-sm text-muted-foreground">Gerenciamento Médico</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setCurrentPage(item.id)}
                    isActive={currentPage === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">
                  {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>
          </div>
          <div className="p-6">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}