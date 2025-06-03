
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { useProfile } from '@/hooks/useProfile';

interface Service {
  id: string;
  name: string;
  price: string;
}

interface OrderFormProps {
  categories: Array<{ value: string; label: string }>;
  services: Record<string, Service[]>;
}

const OrderForm: React.FC<OrderFormProps> = ({ categories, services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('promocional');
  const [selectedService, setSelectedService] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState<number>(1000);
  
  const { createOrder, calculatePrice, isLoading } = useOrders();
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

  const validateForm = () => {
    if (!selectedService) {
      return { valid: false, message: 'Selecione um serviço' };
    }
    if (!link.trim()) {
      return { valid: false, message: 'Insira o link' };
    }
    if (!quantity || quantity < 100) {
      return { valid: false, message: 'Quantidade mínima é 100' };
    }
    if (quantity > 1000000) {
      return { valid: false, message: 'Quantidade máxima é 1.000.000' };
    }
    
    // Validar formato do link básico
    try {
      new URL(link);
    } catch {
      return { valid: false, message: 'Link inválido' };
    }

    return { valid: true, message: '' };
  };

  const handleSubmitOrder = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

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
                  {service.name} - €{service.price} por 1000
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Description - Show only for promotional service */}
        {selectedService === 'promo-1' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded mr-2"></span>
                <span className="text-yellow-500">👑</span> — FUNCIONA EM APENAS REELS E FEED.
              </p>
              
              <div className="space-y-1">
                <p className="text-sm flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-yellow-500">⚡</span> — Inicia em 15 - 60 Minutos. Ser não até 12 horas.
                </p>
                <p className="text-sm flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-yellow-500">⚡</span> — Após iniciado o Sistema entrega: 10.000 a 100.000 Visualizações por Dia.
                </p>
                <p className="text-sm flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-yellow-500">⚡</span> — HQ: Alta Qualidade
                </p>
              </div>

              <p className="text-sm">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded mr-2"></span>
                <span className="text-red-500">🚫</span> SR : ESTE SERVIÇO NÃO CONTA COM REPOSIÇÃO. (NÃO TEM QUEDA)
              </p>

              <div className="space-y-1">
                <p className="text-sm flex items-center">
                  <span className="text-red-500 mr-2">❌</span> — O perfil precisar estar aberto (em modo público).
                </p>
                <p className="text-sm flex items-center">
                  <span className="text-red-500 mr-2">❌</span> — Só faça um pedido para o mesmo LINK após o pedido anterior estiver sido completado.
                </p>
              </div>

              <p className="text-sm">
                <span className="text-yellow-500">❓</span> — O campo Link deve ser preenchido com o LINK Do Vídeo .
              </p>
              <p className="text-sm text-red-500">❌https://www.instagram.com/eu.fabricio_</p>
              <p className="text-sm text-green-500">✅https://www.instagram.com/reel/CfcOSfH9JQnT/</p>
            </div>
          </div>
        )}

        {/* Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
          <Input 
            placeholder="Cole o link da sua publicação/perfil aqui" 
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
          <Input 
            placeholder="Mínimo: 100, Máximo: 1.000.000" 
            type="number" 
            min="100"
            max="1000000"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Mín: 100 | Máx: 1.000.000
          </p>
        </div>

        {/* Price Summary */}
        {selectedServiceData && quantity > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>Preço unitário (por 1000):</span>
              <span>€{selectedServiceData.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Quantidade:</span>
              <span>{quantity.toLocaleString()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Saldo disponível: €{profile?.balance.toFixed(2) || '0.00'}
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmitOrder}
          disabled={isLoading || !selectedService || !link || !quantity}
        >
          {isLoading ? 'Processando...' : 'Fazer Pedido'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
