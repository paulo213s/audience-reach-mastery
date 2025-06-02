
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, CreditCard, BookOpen, BarChart3, Headphones, RefreshCw, Package, Zap, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('promocional');
  
  const sidebarItems = [
    { icon: Plus, label: 'Fazer novo pedido', active: true },
    { icon: BookOpen, label: 'Aulas passo a passo' },
    { icon: CreditCard, label: 'Adicionar Saldo' },
    { icon: BarChart3, label: 'Histórico de pedidos' },
    { icon: Headphones, label: 'Suporte' },
    { icon: RefreshCw, label: 'Refunds' },
    { icon: Package, label: 'Serviços' },
    { icon: Zap, label: 'API' },
    { icon: Package, label: 'Mass order' }
  ];

  const services = [
    {
      id: 257,
      name: 'INSTA - VISUALIZAÇÃO PORTUGAL PT (Promoção Relâmpago)',
      price: '0.30 € per 1000',
      description: 'FUNCIONA EM APENAS REELS E FEED.',
      features: [
        'Inicia em 15 - 60 Minutos. Ser não até 12 horas.',
        'Após iniciado o Sistema entrega: 10.000 a 100.000 Visualizações por Dia.',
        'HQ: Alta Qualidade'
      ],
      warnings: [
        'SR : ESTE SERVIÇO NÃO CONTA COM REPOSIÇÃO. (NÃO TEM QUEDA)',
        'O perfil precisar estar aberto (em modo público).',
        'Só faça um pedido para o mesmo LINK após o pedido anterior estiver sido completado.'
      ],
      linkExample: 'https://www.instagram.com/reel/CfcOSfH9JQnT/'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">UPSECRETO.COM</h1>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                item.active ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.email?.split('@')[0] || 'mariobernardo21'}</h2>
              <p className="text-sm text-gray-600">Nome de Usuário</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">0.017 €</div>
              <div className="text-sm text-gray-600">Saldo disponível</div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-4">Não sabes como usar a ferramenta?</p>
          <div className="space-y-2">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">
              ASSISTIR AULAS PASSO A PASSO 🚀
            </Button>
            <p className="text-gray-700">Tens alguma dúvida?</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chama-nos no WhatsApp
            </Button>
          </div>
        </div>

        {/* Service Form */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promocional">🔥 MEGA CATEGORIA PROMOCIONAL 🔥</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="257 - 👑 INSTA - VISUALIZAÇÃO PORTUGAL PT (Promoção Relâmpago) ⚡ ❤️ - 0.30 € per 1000" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service1">257 - 👑 INSTA - VISUALIZAÇÃO PORTUGAL PT (Promoção Relâmpago) ⚡ ❤️ - 0.30 € per 1000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
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

            {/* Link */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
              <Input placeholder="Enter your link here" />
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <Input placeholder="Enter quantity" type="number" />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Fazer Pedido
            </Button>
          </CardContent>
        </Card>

        {/* Promotional Image */}
        <Card>
          <CardContent className="p-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Precisa tornar sua presença online perceptível?</h3>
                  <p className="text-sm mb-4">
                    Podemos ajudá-lo com isso! Você pode obter grande exposição online 
                    usando os nossos serviços automatizados que oferecemos em nosso painel
                  </p>
                  <p className="text-sm font-medium">
                    Basta fazer um pedido e tudo será feito para você, BOAS COMPRAS !
                  </p>
                </div>
                <div className="ml-6">
                  <div className="w-32 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">Sistema Samuel Prado ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
