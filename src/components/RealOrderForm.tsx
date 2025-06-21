
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useRealOrders } from '@/hooks/useRealOrders';
import { useProfile } from '@/hooks/useProfile';

interface Service {
  id: string;
  name: string;
  price: string;
  deliveryTime?: string;
  quality?: string;
}

interface RealOrderFormProps {
  categories: Array<{ value: string; label: string }>;
  services: Record<string, Service[]>;
}

const RealOrderForm: React.FC<RealOrderFormProps> = ({ categories, services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('promocional');
  const [selectedService, setSelectedService] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState<number>(1000);
  
  const { createOrder, calculatePrice, isLoading } = useRealOrders();
  const { profile } = useProfile();

  const getCurrentServices = () => {
    const categoryServices = services[selectedCategory as keyof typeof services] || [];
    if (searchTerm) {
      return categoryServices.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return categoryServices;
  };

  const getSelectedServiceData = () => {
    const currentServices = getCurrentServices();
    return currentServices.find(service => service.id === selectedService);
  };

  const handleSubmitOrder = async () => {
    const serviceData = getSelectedServiceData();
    if (!serviceData) return;

    const totalAmount = calculatePrice(serviceData.price, quantity);

    const orderData = {
      serviceId: serviceData.id,
      serviceName: serviceData.name,
      link: link.trim(),
      quantity,
      amount: totalAmount
    };

    const success = await createOrder(orderData);
    if (success) {
      // Limpar formulário
      setSelectedService('');
      setLink('');
      setQuantity(1000);
    }
  };

  const selectedServiceData = getSelectedServiceData();
  const totalPrice = selectedServiceData ? calculatePrice(selectedServiceData.price, quantity) : 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Pesquisar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              {getCurrentServices().map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{service.name}</span>
                    <span className="text-green-600 font-medium ml-2">€{service.price}/1k</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Details */}
        {selectedServiceData && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Detalhes do Serviço</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span>Alta Qualidade</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Início: 15-60 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Garantia de entrega</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Link da Publicação/Perfil</label>
          <Input 
            placeholder="Cole o link aqui (ex: https://instagram.com/p/ABC123/)" 
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Certifique-se de que o perfil está público
          </p>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
          <Input 
            placeholder="Quantidade desejada" 
            type="number" 
            min="100"
            max="1000000"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Mínimo: 100</span>
            <span>Máximo: 1.000.000</span>
          </div>
        </div>

        {/* Price Summary */}
        {selectedServiceData && quantity > 0 && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Resumo do Pedido</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Serviço:</span>
                <span className="font-medium">{selectedServiceData.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Preço unitário:</span>
                <span>€{selectedServiceData.price} por 1.000</span>
              </div>
              <div className="flex justify-between">
                <span>Quantidade:</span>
                <span>{quantity.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-green-600">€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Saldo disponível:</span>
                <span className={profile?.balance && profile.balance >= totalPrice ? 'text-green-600' : 'text-red-600'}>
                  €{profile?.balance.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
          onClick={handleSubmitOrder}
          disabled={isLoading || !selectedService || !link || !quantity}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processando Pedido...</span>
            </div>
          ) : (
            'Fazer Pedido Real'
          )}
        </Button>
        
        {selectedServiceData && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Seu pedido será processado automaticamente após a confirmação
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RealOrderForm;
