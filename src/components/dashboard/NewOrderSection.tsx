
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import RealOrderForm from '@/components/RealOrderForm';
import { categories, services } from './ServiceData';

interface NewOrderSectionProps {
  onTutorialClick: () => void;
  onSupportClick: () => void;
}

const NewOrderSection: React.FC<NewOrderSectionProps> = ({
  onTutorialClick,
  onSupportClick
}) => {
  return (
    <>
      {/* Help Section */}
      <div className="mb-6 text-center">
        <p className="text-gray-700 mb-4">Não sabes como usar a ferramenta?</p>
        <div className="space-y-2">
          <Button 
            onClick={onTutorialClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
          >
            ASSISTIR AULAS PASSO A PASSO 🚀
          </Button>
          <p className="text-gray-700">Tens alguma dúvida?</p>
          <Button 
            onClick={onSupportClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chama-nos no WhatsApp
          </Button>
        </div>
      </div>

      {/* Real Order Form */}
      <RealOrderForm categories={categories} services={services} />

      {/* Promotional Image */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Sistema Real de Redes Sociais</h3>
                <p className="text-sm mb-4">
                  Nossa plataforma utiliza APIs reais e sistemas automatizados para entregar 
                  resultados genuínos em suas redes sociais. Todos os pedidos são processados 
                  em tempo real com acompanhamento completo.
                </p>
                <p className="text-sm font-medium">
                  Pagamentos seguros via Stripe • Entrega garantida • Suporte 24/7
                </p>
              </div>
              <div className="ml-6">
                <div className="w-32 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs">Sistema Real ✓</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NewOrderSection;
