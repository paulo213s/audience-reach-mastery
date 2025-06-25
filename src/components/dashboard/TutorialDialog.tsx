
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tutoriais Passo a Passo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Como fazer seu primeiro pedido</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tutorial completo sobre como usar nossa plataforma para fazer pedidos de redes sociais.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir em Nova Aba
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Gerenciando seu saldo</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Aprenda como adicionar saldo, acompanhar transações e gerenciar sua conta.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir em Nova Aba
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Estratégias de crescimento</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Dicas avançadas para maximizar seus resultados nas redes sociais.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir em Nova Aba
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
