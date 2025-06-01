
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Target, DollarSign, Eye, Share2 } from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Taxa de Conversão',
      value: '12.5%',
      change: '+2.3%',
      icon: Target,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Engajamento Total',
      value: '45.2K',
      change: '+15.8%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'ROI Campanhas',
      value: '285%',
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Alcance Orgânico',
      value: '128.9K',
      change: '+8.7%',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard de Performance</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitore suas métricas de mídia social em tempo real e otimize suas estratégias de marketing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-600 font-medium">{metric.change}</div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Otimização Automática Ativa</h3>
            <p className="text-gray-600">Suas campanhas estão sendo otimizadas automaticamente com base em dados de performance em tempo real.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">+34%</div>
            <div className="text-sm text-gray-600">Performance hoje</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
