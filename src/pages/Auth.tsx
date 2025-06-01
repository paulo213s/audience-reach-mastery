
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { TrendingUp, Phone, Mail, Users, Search, BarChart, Target } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">SOCIALMAX.COM</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600">Sign in</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Serviços</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">API</a>
              <a href="#" className="text-blue-600 font-medium">Sign up</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                CRIE SEU CADASTRO E USE OS SERVIÇOS...
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Temos tudo o que você precisa para administrar contas de mídia social bem-sucedidas.
              </p>
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">ENTRE EM CONTATO:</p>
                <div className="flex items-center space-x-2 text-green-600">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">WHATSAPP: 19 992430588</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Mail className="w-4 h-4" />
                  <span>EMAIL: contato@socialmaxpro.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {isLogin ? 'Acesse sua conta' : 'Crie sua conta gratuitamente'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={isLogin ? 'login' : 'register'} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger 
                      value="login" 
                      onClick={() => setIsLogin(true)}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger 
                      value="register" 
                      onClick={() => setIsLogin(false)}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Cadastro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" type="text" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" className="h-12" />
                      <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Sign in
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Do not have an account?{' '}
                      <button 
                        onClick={() => setIsLogin(false)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </div>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Nome Completo</Label>
                      <Input id="fullname" type="text" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newpassword">Senha</Label>
                      <Input id="newpassword" type="password" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmpassword">Confirmar Senha</Label>
                      <Input id="confirmpassword" type="password" className="h-12" />
                    </div>
                    <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium">
                      CRIAR CADASTRO AGORA
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Já tem uma conta?{' '}
                      <button 
                        onClick={() => setIsLogin(true)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Fazer login
                      </button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            É o seu primeiro acesso à plataforma?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Crie seu cadastro agora mesmo pelo botão abaixo, e usufrua do máximo que podemos oferecer ❤️
          </p>
          <Button 
            onClick={() => setIsLogin(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium rounded-lg"
          >
            CRIAR CADASTRO AGORA
          </Button>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gestão de Contas</h3>
            <p className="text-sm text-gray-600">Gerencie múltiplas contas de mídia social em um só lugar</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics Avançado</h3>
            <p className="text-sm text-gray-600">Métricas detalhadas para otimizar suas campanhas</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">SEO Automático</h3>
            <p className="text-sm text-gray-600">Otimização automática para mecanismos de busca</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">ROI Maximizado</h3>
            <p className="text-sm text-gray-600">Estratégias para maximizar retorno do investimento</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
