
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Package } from 'lucide-react';

interface SupportSectionProps {
  whatsappContacts: Array<{ phone_number: string }>;
  emailContacts: Array<{ email: string }>;
  onWhatsAppClick: () => void;
  onEmailClick: () => void;
  onEditWhatsApp: () => void;
  onEditEmail: () => void;
}

const SupportSection: React.FC<SupportSectionProps> = ({
  whatsappContacts,
  emailContacts,
  onWhatsAppClick,
  onEmailClick,
  onEditWhatsApp,
  onEditEmail
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suporte ao Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <div className="flex-1">
              <h3 className="font-medium">WhatsApp</h3>
              <p className="text-sm text-gray-600">
                {whatsappContacts.length > 0 
                  ? whatsappContacts[0].phone_number 
                  : 'Adicionar número do WhatsApp'
                }
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={onWhatsAppClick}
              >
                {whatsappContacts.length > 0 ? 'Abrir Chat' : 'Adicionar'}
              </Button>
              {whatsappContacts.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={onEditWhatsApp}
                >
                  Editar
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
            <div className="flex-1">
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-gray-600">
                {emailContacts.length > 0 
                  ? emailContacts[0].email 
                  : 'Adicionar endereço de email'
                }
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={onEmailClick}
              >
                {emailContacts.length > 0 ? 'Enviar Email' : 'Adicionar'}
              </Button>
              {emailContacts.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={onEditEmail}
                >
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
