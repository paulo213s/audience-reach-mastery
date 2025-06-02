import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, CreditCard, BookOpen, BarChart3, Headphones, RefreshCw, Package, Zap, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import BalanceTopUp from '@/components/BalanceTopUp';
import OrderHistory from '@/components/OrderHistory';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('promocional');
  const [activeSection, setActiveSection] = useState('new-order');
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  
  const sidebarItems = [
    { icon: Plus, label: 'Fazer novo pedido', id: 'new-order' },
    { icon: BookOpen, label: 'Aulas passo a passo', id: 'tutorials' },
    { icon: CreditCard, label: 'Adicionar Saldo', id: 'add-balance' },
    { icon: BarChart3, label: 'Histórico de pedidos', id: 'order-history' },
    { icon: Headphones, label: 'Suporte', id: 'support' },
    { icon: RefreshCw, label: 'Refunds', id: 'refunds' },
    { icon: Package, label: 'Serviços', id: 'services' },
    { icon: Zap, label: 'API', id: 'api' },
    { icon: Package, label: 'Mass order', id: 'mass-order' }
  ];

  const handleSidebarClick = (id: string) => {
    if (id === 'add-balance') {
      setShowBalanceDialog(true);
    } else {
      setActiveSection(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">UPSECRETO.COM</h1>
          {profile && (
            <p className="text-sm text-blue-200 mt-1">
              {profile.user_type === 'admin' ? 'Administrador' : 'Cliente'}
            </p>
          )}
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSidebarClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
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
              <h2 className="text-xl font-bold text-gray-900">
                {profile?.full_name || user?.email?.split('@')[0] || 'Usuário'}
              </h2>
              <p className="text-sm text-gray-600">
                {profile?.user_type === 'admin' ? 'Administrador' : 'Cliente'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                €{profile?.balance?.toFixed(2) || '0.00'}
              </div>
              <div className="text-sm text-gray-600">Saldo disponível</div>
            </div>
            <Button
              onClick={() => setShowBalanceDialog(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Carregar
            </Button>
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === 'new-order' && (
          <>
            {/* Help Section */}
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-4">Não sabes como usar a ferramenta?</p>
              <div className="space-y-2">
                <Button 
                  onClick={() => setActiveSection('tutorials')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                >
                  ASSISTIR AULAS PASSO A PASSO 🚀
                </Button>
                <p className="text-gray-700">Tens alguma dúvida?</p>
                <Button 
                  onClick={() => setActiveSection('support')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                >
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
          </>
        )}

        {activeSection === 'order-history' && <OrderHistory />}

        {activeSection === 'tutorials' && (
          <Card>
            <CardHeader>
              <CardTitle>Aulas Passo a Passo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Aqui você encontrará tutoriais detalhados sobre como usar nossa plataforma.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Como fazer seu primeiro pedido</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Aprenda o básico sobre como navegar e fazer pedidos em nossa plataforma.
                  </p>
                  <Button variant="outline" size="sm">Ver Tutorial</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Gerenciando seu saldo</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Como adicionar saldo e acompanhar suas transações.
                  </p>
                  <Button variant="outline" size="sm">Ver Tutorial</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'support' && (
          <Card>
            <CardHeader>
              <CardTitle>Suporte ao Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-sm text-gray-600">19 992430588</p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Abrir Chat
                  </Button>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-600">contato@socialmaxpro.com</p>
                  </div>
                  <Button variant="outline">
                    Enviar Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {(activeSection === 'refunds' || activeSection === 'services' || activeSection === 'api' || activeSection === 'mass-order') && (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeSection === 'refunds' && 'Reembolsos'}
                {activeSection === 'services' && 'Serviços'}
                {activeSection === 'api' && 'API'}
                {activeSection === 'mass-order' && 'Pedidos em Massa'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Esta seção está em desenvolvimento. Em breve estará disponível.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Balance Top-up Dialog */}
      <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Saldo</DialogTitle>
          </DialogHeader>
          <BalanceTopUp onClose={() => setShowBalanceDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
