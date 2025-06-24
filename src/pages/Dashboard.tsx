import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, CreditCard, BookOpen, BarChart3, Headphones, RefreshCw, Package, Zap, MessageCircle, Play, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useContacts } from '@/hooks/useContacts';
import StripePayment from '@/components/StripePayment';
import PaymentSuccessHandler from '@/components/PaymentSuccessHandler';
import OrderHistory from '@/components/OrderHistory';
import RealOrderForm from '@/components/RealOrderForm';
import ContactDialog from '@/components/ContactDialog';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const {
    whatsappContacts,
    emailContacts,
    loading: contactsLoading,
    saveWhatsAppContact,
    saveEmailContact,
    openWhatsApp,
    openEmail
  } = useContacts();
  
  const [activeSection, setActiveSection] = useState('new-order');
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showTutorialDialog, setShowTutorialDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactType, setContactType] = useState<'whatsapp' | 'email'>('whatsapp');
  
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

  const categories = [
    { value: 'promocional', label: '🔥 MEGA CATEGORIA PROMOCIONAL 🔥' },
    { value: 'instagram', label: '📷 Instagram' },
    { value: 'youtube', label: '🎥 YouTube' },
    { value: 'facebook', label: '📘 Facebook' },
    { value: 'tiktok', label: '🎵 TikTok' },
    { value: 'twitter', label: '🐦 Twitter' },
    { value: 'telegram', label: '📱 Telegram' },
    { value: 'twitch', label: '🎮 Twitch' },
    { value: 'kwai', label: '🌟 Kwai' }
  ];

  const services = {
    instagram: [
      { id: 'insta-1', name: '📊 INSTA - Mais Vendidos', price: '0.25' },
      { id: 'insta-2', name: '🇵🇹 INSTA - Seguidores Portugal', price: '0.40' },
      { id: 'insta-3', name: '🇵🇹 INSTA - Seguidores Mistos', price: '0.35' },
      { id: 'insta-4', name: '🌍 INSTA - Seguidores Mundiais', price: '0.30' },
      { id: 'insta-5', name: '☀️ INSTA - Serviços Orgânicos', price: '0.50' },
      { id: 'insta-6', name: '👫 INSTA - Seguidores Genero', price: '0.45' },
      { id: 'insta-7', name: '✅ INSTA - Seguidores Verificados', price: '0.60' },
      { id: 'insta-8', name: '🎁 INSTA - PRESENTE GRÁTIS', price: '0.00' },
      { id: 'insta-9', name: '💚 INSTA - Gostos Portugal', price: '0.25' },
      { id: 'insta-10', name: '❤️ INSTA - Gostos Mundiais', price: '0.20' },
      { id: 'insta-11', name: '✅ INSTA - Gostos Verificadas', price: '0.40' },
      { id: 'insta-12', name: '👁️ INSTA - Visualização em Vídeo', price: '0.15' },
      { id: 'insta-13', name: '🎬 INSTA - Serviços para Story', price: '0.30' },
      { id: 'insta-14', name: '📊 INSTA - Votos em Enquete Story', price: '0.25' }
    ],
    youtube: [
      { id: 'ytb-1', name: '📝 YTB - Inscritos', price: '0.80' },
      { id: 'ytb-2', name: '👁️ YTB - Visualizações (REAIS)', price: '0.30' },
      { id: 'ytb-3', name: '👍 YTB - Likes', price: '0.25' },
      { id: 'ytb-4', name: '💬 YTB - Comentários', price: '0.50' },
      { id: 'ytb-5', name: '🔴 YTB - Comentários em Live', price: '0.60' },
      { id: 'ytb-6', name: '✅ YTB - Comentários Verificados', price: '0.75' }
    ],
    facebook: [
      { id: 'face-1', name: '👥 FACE - Membros para grupos', price: '0.35' },
      { id: 'face-2', name: '✅ FACE - Confirmação em Evento', price: '0.40' },
      { id: 'face-3', name: '💰 FACE - Monetização Visualização', price: '0.30' },
      { id: 'face-4', name: '📊 FACE - Avaliação em Página', price: '0.45' },
      { id: 'face-5', name: '📺 FACE - Telespectadores em Live', price: '0.50' },
      { id: 'face-6', name: '🤝 FACE - Solicitação de Amizade', price: '0.35' },
      { id: 'face-7', name: '👥 FACE - Seguidores Perfil Pessoal', price: '0.40' },
      { id: 'face-8', name: '📄 FACE - Seguidores Para Página', price: '0.35' },
      { id: 'face-9', name: '👍 FACE - Gostos em Página', price: '0.30' },
      { id: 'face-10', name: '👍 FACE - Curtidas em Publicação', price: '0.25' },
      { id: 'face-11', name: '🎥 FACE - Visualização em Vídeo', price: '0.20' },
      { id: 'face-12', name: '👍 FACE - Reação em publicações', price: '0.30' },
      { id: 'face-13', name: '💬 FACE - Comentários', price: '0.45' },
      { id: 'face-14', name: '📖 FACE - Visualização em Story', price: '0.15' }
    ],
    tiktok: [
      { id: 'tiktok-1', name: '👥 TIKTOK - Seguidores Portugal', price: '0.60' },
      { id: 'tiktok-2', name: '🌍 TIKTOK - Seguidores por Gênero', price: '0.55' },
      { id: 'tiktok-3', name: '🌎 TIKTOK - Seguidores Mundiais', price: '0.50' },
      { id: 'tiktok-4', name: '👍 TIKTOK - Gostos', price: '0.25' },
      { id: 'tiktok-5', name: '👁️ TIKTOK - Visualização em Vídeo', price: '0.20' },
      { id: 'tiktok-6', name: '🛠️ TIKTOK - Serviços', price: '0.40' },
      { id: 'tiktok-7', name: '💬 TIKTOK - Comentários', price: '0.45' },
      { id: 'tiktok-8', name: '✅ TIKTOK - Comentário Verificado', price: '0.70' }
    ],
    twitch: [
      { id: 'twitch-1', name: '👥 TWITCH - Seguidores', price: '0.50' },
      { id: 'twitch-2', name: '🛠️ TWITCH - Serviços', price: '0.45' },
      { id: 'twitch-3', name: '📺 TWITCH - Telespectadores em Live', price: '0.60' }
    ],
    telegram: [
      { id: 'telegram-1', name: '👥 TELEGRAM - Seguidores', price: '0.35' },
      { id: 'telegram-2', name: '👍 TELEGRAM - Reações', price: '0.25' }
    ],
    kwai: [
      { id: 'kwai-1', name: '👥 KAWAI - Seguidores', price: '0.45' },
      { id: 'kwai-2', name: '👍 KAWAI - Gostos', price: '0.30' },
      { id: 'kwai-3', name: '👁️ KAWAI - Visualizações em Vídeo', price: '0.20' }
    ],
    promocional: [
      { id: 'promo-1', name: '👑 INSTA - VISUALIZAÇÃO PORTUGAL PT (Promoção Relâmpago) ⚡ ❤️', price: '0.30' }
    ]
  };

  const handleSidebarClick = (id: string) => {
    if (id === 'add-balance') {
      setShowBalanceDialog(true);
    } else {
      setActiveSection(id);
    }
  };

  const handleTutorialClick = () => {
    setShowTutorialDialog(true);
  };

  const handleWhatsAppClick = () => {
    if (whatsappContacts.length > 0) {
      openWhatsApp(whatsappContacts[0].phone_number);
    } else {
      setContactType('whatsapp');
      setShowContactDialog(true);
    }
  };

  const handleEmailClick = () => {
    if (emailContacts.length > 0) {
      openEmail(emailContacts[0].email);
    } else {
      setContactType('email');
      setShowContactDialog(true);
    }
  };

  const handleSignOut = () => {
    signOut();
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
      <PaymentSuccessHandler />
      
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

        {/* Botão de Sair */}
        <div className="mt-auto pt-8">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full text-white border-white hover:bg-white hover:text-blue-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
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
                  onClick={handleTutorialClick}
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

            {/* Real Order Form */}
            <RealOrderForm categories={categories} services={services} />

            {/* Promotional Image */}
            <Card>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Sistema Real de Redes Sociais</h3>
                      <p className="text-sm mb-4">
                        Nossa plataforma utiliza APIs reais e sistemas automatizados para entregar 
                        resultados genuínos em suas redes sociais. Todos os pedidos são processados 
                        em tempo real com acompanhamento completo.
                      </p>
                      <p className="text-sm font-medium">
                        Pagamentos seguros via Stripe • Entrega garantida • Suporte 24/7
                      </p>
                    </div>
                    <div className="ml-6">
                      <div className="w-32 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs">Sistema Real ✓</span>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleTutorialClick}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ver Tutorial
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Gerenciando seu saldo</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Como adicionar saldo e acompanhar suas transações.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleTutorialClick}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ver Tutorial
                  </Button>
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
                  <div className="flex-1">
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-sm text-gray-600">
                      {whatsappContacts.length > 0 
                        ? whatsappContacts[0].phone_number 
                        : 'Adicionar número do WhatsApp'
                      }
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleWhatsAppClick}
                    >
                      {whatsappContacts.length > 0 ? 'Abrir Chat' : 'Adicionar'}
                    </Button>
                    {whatsappContacts.length > 0 && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setContactType('whatsapp');
                          setShowContactDialog(true);
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-600">
                      {emailContacts.length > 0 
                        ? emailContacts[0].email 
                        : 'Adicionar endereço de email'
                      }
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      onClick={handleEmailClick}
                    >
                      {emailContacts.length > 0 ? 'Enviar Email' : 'Adicionar'}
                    </Button>
                    {emailContacts.length > 0 && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setContactType('email');
                          setShowContactDialog(true);
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  </div>
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
          <StripePayment onClose={() => setShowBalanceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Tutorial Dialog */}
      <Dialog open={showTutorialDialog} onOpenChange={setShowTutorialDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tutoriais Passo a Passo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Como fazer seu primeiro pedido</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Tutorial completo sobre como usar nossa plataforma para fazer pedidos de redes sociais.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Agora
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir em Nova Aba
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Gerenciando seu saldo</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Aprenda como adicionar saldo, acompanhar transações e gerenciar sua conta.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Agora
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir em Nova Aba
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Estratégias de crescimento</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Dicas avançadas para maximizar seus resultados nas redes sociais.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Agora
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir em Nova Aba
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <ContactDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        type={contactType}
        onSave={contactType === 'whatsapp' ? saveWhatsAppContact : saveEmailContact}
        loading={contactsLoading}
      />
    </div>
  );
};

export default Dashboard;
