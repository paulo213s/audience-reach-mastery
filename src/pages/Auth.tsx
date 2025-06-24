
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MessageCircle, TrendingUp, Users, Target, Zap } from 'lucide-react';

const Auth = () => {
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'admin' | 'client'>('client');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(loginEmail, loginPassword);
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signUp(signupEmail, signupPassword, fullName, userType);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-600">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
                CRIE SEU CADASTRO E USE OS SERVIÇOS...
              </h1>
              <p className="text-xl mb-4">
                Temos tudo o que você precisa para administrar contas de mídia social bem-sucedidas.
              </p>
              <div className="mb-6">
                <p className="font-semibold mb-2">ENTRE EM CONTATO:</p>
                <div className="space-y-1">
                  <p className="text-green-300 font-medium">
                    📱 WHATSAPP: 19 992430588
                  </p>
                  <p>📧 EMAIL: AlavancarFM@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {!showSignup ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                    <Input
                      id="username"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="mt-2 h-12 border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="mt-2 h-12 border-gray-300 rounded-lg"
                      required
                    />
                    <div className="text-right mt-2">
                      <a href="#" className="text-blue-500 text-sm hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Sign in'}
                  </Button>
                  <div className="text-center text-gray-600">
                    Do not have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowSignup(true)}
                      className="text-blue-500 hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-4">Criar Conta</h3>
                  <div>
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signupPassword">Senha</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="userType">Tipo de Conta</Label>
                    <Select value={userType} onValueChange={(value: 'admin' | 'client') => setUserType(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Cliente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Criar Conta'}
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowSignup(false)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Já tem conta? Fazer login
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            É o seu primeiro acesso a plataforma ?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Crie seu cadastro agora mesmo pelo botão abaixo, e usufrua do máximo que podemos oferecer ❤️
          </p>
          <Button 
            onClick={() => setShowSignup(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-bold rounded-xl shadow-lg"
          >
            CRIAR CADASTRO AGORA
          </Button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800">Crescimento</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800">Comunidade</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800">Precisão</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800">Velocidade</h3>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Fixed Button */}
      <a
        href="https://wa.me/5519992430588"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Auth;
