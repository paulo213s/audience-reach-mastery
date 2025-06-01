
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, BarChart3, Users, TrendingUp } from 'lucide-react';

const SocialFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'campaign',
      title: 'Campanha de Awareness - Produto X',
      content: 'Nossa nova campanha de conscientização está superando as expectativas! Alcance orgânico de 45K usuários nas primeiras 24h.',
      metrics: { likes: 234, comments: 45, shares: 67, conversions: 23 },
      performance: '+125%',
      timestamp: '2 horas atrás'
    },
    {
      id: 2,
      type: 'insight',
      title: 'Insight: Melhor Horário de Postagem',
      content: 'Análise de dados revela que posts entre 19h-21h geram 40% mais engajamento para nosso público-alvo.',
      metrics: { likes: 189, comments: 32, shares: 28, conversions: 15 },
      performance: '+67%',
      timestamp: '4 horas atrás'
    },
    {
      id: 3,
      type: 'success',
      title: 'Meta de Conversão Atingida!',
      content: 'Parabéns! A campanha de retargeting atingiu 110% da meta mensal de conversões. ROI atual: 285%.',
      metrics: { likes: 312, comments: 78, shares: 95, conversions: 87 },
      performance: '+210%',
      timestamp: '6 horas atrás'
    }
  ]);

  const handleInteraction = (postId: number, type: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedMetrics = { ...post.metrics };
        if (type === 'like') updatedMetrics.likes += 1;
        if (type === 'comment') updatedMetrics.comments += 1;
        if (type === 'share') updatedMetrics.shares += 1;
        return { ...post, metrics: updatedMetrics };
      }
      return post;
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return BarChart3;
      case 'insight': return TrendingUp;
      case 'success': return Users;
      default: return BarChart3;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'campaign': return 'text-blue-600 bg-blue-50';
      case 'insight': return 'text-purple-600 bg-purple-50';
      case 'success': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Feed de Atividades</h2>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Nova Campanha
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const TypeIcon = getTypeIcon(post.type);
          return (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(post.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-emerald-600">{post.performance}</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleInteraction(post.id, 'like')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.metrics.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleInteraction(post.id, 'comment')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.metrics.comments}</span>
                    </button>
                    <button 
                      onClick={() => handleInteraction(post.id, 'share')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{post.metrics.shares}</span>
                    </button>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Conversões: </span>
                    <span className="font-semibold text-purple-600">{post.metrics.conversions}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SocialFeed;
