
import React from 'react';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">SocialMax Pro</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Sistema abrangente de mídia social para maximizar seu ROI e otimizar campanhas de marketing digital.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Soluções</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Otimização de Conversão</li>
              <li>Análise de ROI</li>
              <li>SEO Automático</li>
              <li>Gestão de Campanhas</li>
              <li>Analytics Avançado</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Recursos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Centro de Ajuda</li>
              <li>Documentação API</li>
              <li>Webinars</li>
              <li>Blog de Marketing</li>
              <li>Estudos de Caso</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contato</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@socialmaxpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 SocialMax Pro. Todos os direitos reservados. Desenvolvido para maximizar seu sucesso digital.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
