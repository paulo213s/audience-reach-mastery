
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, BookOpen, BarChart3, Headphones, RefreshCw, Package, Zap, LogOut } from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
}

interface DashboardSidebarProps {
  activeSection: string;
  onSidebarClick: (id: string) => void;
  onSignOut: () => void;
  userType?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSidebarClick,
  onSignOut,
  userType
}) => {
  const sidebarItems: SidebarItem[] = [
    { icon: Plus, label: 'Fazer novo pedido', id: 'new-order' },
    { icon: BookOpen, label: 'Aulas passo a passo', id: 'tutorials' },
    { icon: CreditCard, label: 'Adicionar Saldo', id: 'add-balance' },
    { icon: BarChart3, label: 'Histórico de pedidos', id: 'order-history' },
    { icon: Headphones, label: 'Suporte', id: 'support' },
    { icon: RefreshCw, label: 'Refunds', id: 'refunds' },
    { icon: Package, label: 'Serviços', id: 'services' },
    { icon: Zap, label: 'API', id: 'api' },
    { icon: Package, label: 'Mass order', id: 'mass-order' }
  ];

  return (
    <div className="w-64 bg-blue-600 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">UPSECRETO.COM</h1>
        <p className="text-sm text-blue-200 mt-1">
          {userType === 'admin' ? 'Administrador' : 'Cliente'}
        </p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onSidebarClick(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeSection === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Button
          onClick={onSignOut}
          variant="outline"
          className="w-full text-white border-white hover:bg-white hover:text-blue-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
