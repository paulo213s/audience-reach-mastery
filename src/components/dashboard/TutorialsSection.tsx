
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface TutorialsSectionProps {
  onTutorialClick: () => void;
}

const TutorialsSection: React.FC<TutorialsSectionProps> = ({ onTutorialClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aulas Passo a Passo</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Aqui você encontrará tutoriais detalhados sobre como usar nossa plataforma.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Como fazer seu primeiro pedido</h3>
            <p className="text-sm text-gray-600 mb-4">
              Aprenda o básico sobre como navegar e fazer pedidos em nossa plataforma.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onTutorialClick}
            >
              <Play className="w-4 h-4 mr-2" />
              Ver Tutorial
            </Button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Gerenciando seu saldo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Como adicionar saldo e acompanhar suas transações.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onTutorialClick}
            >
              <Play className="w-4 h-4 mr-2" />
              Ver Tutorial
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialsSection;
