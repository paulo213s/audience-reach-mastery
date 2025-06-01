
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Search, Zap, Users, TrendingUp, Eye } from 'lucide-react';

const MarketingStrategies = () => {
  const strategies = [
    {
      title: 'Otimização CRO',
      description: 'Teste A/B automático em landing pages e CTAs para maximizar conversões.',
      icon: Target,
      color: 'text-emerald-600 bg-emerald-50',
      improvement: '+45%',
      status: 'Ativo'
    },
    {
      title: 'SEO Inteligente',
      description: 'Análise de palavras-chave e otimização de conteúdo em tempo real.',
      icon: Search,
      color: 'text-blue-600 bg-blue-50',
      improvement: '+32%',
      status: 'Executando'
    },
    {
      title: 'Retargeting',
      description: 'Campanhas personalizadas para usuários que demonstraram interesse.',
      icon: Zap,
      color: 'text-purple-600 bg-purple-50',
      improvement: '+78%',
      status: 'Ativo'
    },
    {
      title: 'Análise de Audiência',
      description: 'Segmentação avançada baseada em comportamento e interesses.',
      icon: Users,
      color: 'text-orange-600 bg-orange-50',
      improvement: '+23%',
      status: 'Planejando'
    }
  ];

  const insights = [
    {
      title: 'Pico de Engajamento',
      description: 'Seus posts têm 40% mais engajamento às terças-feiras',
      trend: 'up'
    },
    {
      title: 'Público Emergente',
      description: 'Crescimento de 25% no público de 25-34 anos',
      trend: 'up'
    },
    {
      title: 'Oportunidade de Melhoria',
      description: 'Taxa de clique pode aumentar 15% otimizando CTAs',
      trend: 'neutral'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Estratégias Ativas</h2>
      
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${strategy.color}`}>
                <strategy.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{strategy.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    strategy.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' :
                    strategy.status === 'Executando' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {strategy.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{strategy.description}</p>
                <div className="text-sm">
                  <span className="text-gray-500">Melhoria: </span>
                  <span className="font-semibold text-emerald-600">{strategy.improvement}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-md">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="w-4 h-4 mr-2 text-blue-600" />
          Insights Recentes
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <TrendingUp className={`w-4 h-4 mt-1 ${insight.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                <p className="text-gray-600 text-xs">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        Ver Relatório Completo
      </Button>
    </div>
  );
};

export default MarketingStrategies;
