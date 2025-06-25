
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface GenericSectionProps {
  title: string;
}

const GenericSection: React.FC<GenericSectionProps> = ({ title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Esta seção está em desenvolvimento. Em breve estará disponível.
        </p>
      </CardContent>
    </Card>
  );
};

export default GenericSection;
