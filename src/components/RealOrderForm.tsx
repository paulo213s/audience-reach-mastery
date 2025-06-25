
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceTable from '@/components/dashboard/ServiceTable';
import ServiceModal from '@/components/dashboard/ServiceModal';

interface Service {
  id: string;
  name: string;
  price: string;
  minOrder: number;
  maxOrder: number;
  description: string;
}

interface Category {
  value: string;
  label: string;
}

interface RealOrderFormProps {
  categories: Category[];
  services: Record<string, Service[]>;
}

const RealOrderForm: React.FC<RealOrderFormProps> = ({ categories, services }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const getCategoryServices = () => {
    if (!selectedCategory || !services[selectedCategory]) {
      return [];
    }
    return services[selectedCategory];
  };

  const getCategoryLabel = () => {
    const category = categories.find(cat => cat.value === selectedCategory);
    return category ? category.label : '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Novo Pedido - Serviços de Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Selecionar Categoria
              </label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma categoria de serviços" />
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
          </div>
        </CardContent>
      </Card>

      {selectedCategory && (
        <ServiceTable
          services={getCategoryServices()}
          categoryName={getCategoryLabel()}
          onViewService={handleViewService}
        />
      )}

      <ServiceModal
        service={selectedService}
        open={showServiceModal}
        onOpenChange={setShowServiceModal}
      />
    </div>
  );
};

export default RealOrderForm;
