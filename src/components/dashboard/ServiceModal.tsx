
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealOrders } from '@/hooks/useRealOrders';

interface Service {
  id: string;
  name: string;
  price: string;
  minOrder: number;
  maxOrder: number;
  description: string;
}

interface ServiceModalProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, open, onOpenChange }) => {
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const { createOrder, calculatePrice, isLoading } = useRealOrders();

  if (!service) return null;

  const numQuantity = parseInt(quantity) || 0;
  const totalPrice = calculatePrice(service.price, numQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!link.trim() || !quantity) {
      return;
    }

    const success = await createOrder({
      serviceId: service.id,
      serviceName: service.name,
      link: link.trim(),
      quantity: numQuantity,
      amount: totalPrice
    });

    if (success) {
      setLink('');
      setQuantity('');
      onOpenChange(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline">ID: {service.id}</Badge>
            Detalhes do Serviço
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nome do Serviço</Label>
                  <p className="text-lg font-semibold">{service.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Preço por 1000</Label>
                    <p className="text-xl font-bold text-blue-600">€{service.price}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Descrição</Label>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Pedido Mínimo</Label>
                    <p className="font-semibold">{formatNumber(service.minOrder)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Pedido Máximo</Label>
                    <p className="font-semibold">{formatNumber(service.maxOrder)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="link">Link *</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://instagram.com/seu-perfil"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantidade *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder={`Min: ${service.minOrder}, Max: ${formatNumber(service.maxOrder)}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={service.minOrder}
                    max={service.maxOrder}
                    required
                  />
                </div>

                {numQuantity > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total a pagar:</span>
                      <span className="text-xl font-bold text-blue-600">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatNumber(numQuantity)} × €{service.price}/1000
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading || !link.trim() || !quantity}
                    className="flex-1"
                  >
                    {isLoading ? 'Processando...' : 'Fazer Pedido'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
