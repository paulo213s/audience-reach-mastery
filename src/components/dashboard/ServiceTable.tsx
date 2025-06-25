
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: string;
  minOrder: number;
  maxOrder: number;
  description: string;
}

interface ServiceTableProps {
  services: Service[];
  categoryName: string;
  onViewService: (service: Service) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, categoryName, onViewService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.id.includes(searchTerm)
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{categoryName}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Service</TableHead>
                <TableHead className="font-semibold text-right">Rate per 1000</TableHead>
                <TableHead className="font-semibold text-right">Min order</TableHead>
                <TableHead className="font-semibold text-right">Max order</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <Badge variant="outline">{service.id}</Badge>
                  </TableCell>
                  <TableCell className="font-medium max-w-md">
                    <div className="truncate" title={service.name}>
                      {service.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-blue-600">
                    €{service.price}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(service.minOrder)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(service.maxOrder)}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-gray-600" title={service.description}>
                      {service.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      size="sm" 
                      onClick={() => onViewService(service)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum serviço encontrado para "{searchTerm}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceTable;
