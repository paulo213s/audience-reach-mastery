
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface DashboardHeaderProps {
  fullName?: string;
  email?: string;
  userType?: string;
  balance?: number;
  onAddBalance: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  fullName,
  email,
  userType,
  balance,
  onAddBalance
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-600 rounded"></div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {fullName || email?.split('@')[0] || 'Usuário'}
          </h2>
          <p className="text-sm text-gray-600">
            {userType === 'admin' ? 'Administrador' : 'Cliente'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            €{balance?.toFixed(2) || '0.00'}
          </div>
          <div className="text-sm text-gray-600">Saldo disponível</div>
        </div>
        <Button
          onClick={onAddBalance}
          className="bg-green-600 hover:bg-green-700 px-4 py-2"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Carregar
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
