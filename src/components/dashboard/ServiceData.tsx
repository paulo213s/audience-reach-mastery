
export const categories = [
  { value: 'promocional', label: '⚡ MEGA CATEGORIA PROMOCIONAL ⚡' },
  { value: 'instagram', label: '📷 INSTA - Mais Vendidos' },
  { value: 'instagram-portugal', label: '🇵🇹 INSTA - Seguidores Portugal' },
  { value: 'youtube', label: '🎥 YouTube' },
  { value: 'facebook', label: '📘 Facebook' },
  { value: 'tiktok', label: '🎵 TikTok' },
  { value: 'twitter', label: '🐦 Twitter' },
  { value: 'telegram', label: '📱 Telegram' },
  { value: 'twitch', label: '🎮 Twitch' },
  { value: 'kwai', label: '🌟 Kwai' }
];

export const services = {
  promocional: [
    { 
      id: '257', 
      name: '👁️ INSTA - VISUALIZAÇÃO PORTUGAL PT (Promoção Relâmpago) ⚡ ❤️', 
      price: '0.30',
      minOrder: 100,
      maxOrder: 100000000,
      description: 'Visualizações portuguesas para Instagram'
    },
    { 
      id: '240', 
      name: '❤️ INSTA - GOSTOS MUNDIAIS (Promoção Relâmpago) ⚡ ❤️', 
      price: '0.39',
      minOrder: 10,
      maxOrder: 5000000,
      description: 'Gostos mundiais para Instagram'
    }
  ],
  instagram: [
    { 
      id: '2', 
      name: '👥 INSTA - SEGUIDORES ❤️', 
      price: '5.60',
      minOrder: 10,
      maxOrder: 5000000,
      description: 'Seguidores para Instagram'
    },
    { 
      id: '3', 
      name: '❤️ INSTA - GOSTOS ❤️', 
      price: '0.50',
      minOrder: 10,
      maxOrder: 5000000,
      description: 'Gostos para Instagram'
    },
    { 
      id: '4', 
      name: '👁️ INSTA - VISUALIZAÇÃO ❤️', 
      price: '0.35',
      minOrder: 100,
      maxOrder: 100000000,
      description: 'Visualizações para Instagram'
    },
    { 
      id: '5', 
      name: '👁️ INSTA - VISUALIZAÇÃO PORTUGAL PT', 
      price: '0.45',
      minOrder: 100,
      maxOrder: 100000000,
      description: 'Visualizações portuguesas para Instagram'
    }
  ],
  'instagram-portugal': [
    { id: 'insta-pt-1', name: '🇵🇹 INSTA - Seguidores Portugal', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Seguidores portugueses' },
    { id: 'insta-pt-2', name: '🇵🇹 INSTA - Seguidores Mistos', price: '0.35', minOrder: 10, maxOrder: 5000000, description: 'Seguidores mistos' },
    { id: 'insta-pt-3', name: '🌍 INSTA - Seguidores Mundiais', price: '0.30', minOrder: 10, maxOrder: 5000000, description: 'Seguidores mundiais' },
    { id: 'insta-pt-4', name: '☀️ INSTA - Serviços Orgânicos', price: '0.50', minOrder: 10, maxOrder: 5000000, description: 'Serviços orgânicos' },
    { id: 'insta-pt-5', name: '👫 INSTA - Seguidores Genero', price: '0.45', minOrder: 10, maxOrder: 5000000, description: 'Seguidores por gênero' },
    { id: 'insta-pt-6', name: '✅ INSTA - Seguidores Verificados', price: '0.60', minOrder: 10, maxOrder: 5000000, description: 'Seguidores verificados' },
    { id: 'insta-pt-7', name: '🎁 INSTA - PRESENTE GRÁTIS', price: '0.00', minOrder: 1, maxOrder: 1000, description: 'Presente grátis' },
    { id: 'insta-pt-8', name: '💚 INSTA - Gostos Portugal', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Gostos portugueses' },
    { id: 'insta-pt-9', name: '❤️ INSTA - Gostos Mundiais', price: '0.20', minOrder: 10, maxOrder: 5000000, description: 'Gostos mundiais' },
    { id: 'insta-pt-10', name: '✅ INSTA - Gostos Verificadas', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Gostos verificados' },
    { id: 'insta-pt-11', name: '👁️ INSTA - Visualização em Vídeo', price: '0.15', minOrder: 100, maxOrder: 100000000, description: 'Visualizações em vídeo' },
    { id: 'insta-pt-12', name: '🎬 INSTA - Serviços para Story', price: '0.30', minOrder: 100, maxOrder: 100000000, description: 'Serviços para stories' },
    { id: 'insta-pt-13', name: '📊 INSTA - Votos em Enquete Story', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Votos em enquetes de story' }
  ],
  youtube: [
    { id: 'ytb-1', name: '📝 YTB - Inscritos', price: '0.80', minOrder: 10, maxOrder: 5000000, description: 'Inscritos no YouTube' },
    { id: 'ytb-2', name: '👁️ YTB - Visualizações (REAIS)', price: '0.30', minOrder: 100, maxOrder: 100000000, description: 'Visualizações reais' },
    { id: 'ytb-3', name: '👍 YTB - Likes', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Likes no YouTube' },
    { id: 'ytb-4', name: '💬 YTB - Comentários', price: '0.50', minOrder: 1, maxOrder: 1000, description: 'Comentários personalizados' },
    { id: 'ytb-5', name: '🔴 YTB - Comentários em Live', price: '0.60', minOrder: 1, maxOrder: 1000, description: 'Comentários em lives' },
    { id: 'ytb-6', name: '✅ YTB - Comentários Verificados', price: '0.75', minOrder: 1, maxOrder: 1000, description: 'Comentários de perfis verificados' }
  ],
  facebook: [
    { id: 'face-1', name: '👥 FACE - Membros para grupos', price: '0.35', minOrder: 10, maxOrder: 5000000, description: 'Membros para grupos' },
    { id: 'face-2', name: '✅ FACE - Confirmação em Evento', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Confirmações em eventos' },
    { id: 'face-3', name: '💰 FACE - Monetização Visualização', price: '0.30', minOrder: 100, maxOrder: 100000000, description: 'Visualizações para monetização' },
    { id: 'face-4', name: '📊 FACE - Avaliação em Página', price: '0.45', minOrder: 5, maxOrder: 1000, description: 'Avaliações em páginas' },
    { id: 'face-5', name: '📺 FACE - Telespectadores em Live', price: '0.50', minOrder: 10, maxOrder: 10000, description: 'Telespectadores em lives' },
    { id: 'face-6', name: '🤝 FACE - Solicitação de Amizade', price: '0.35', minOrder: 10, maxOrder: 5000000, description: 'Solicitações de amizade' },
    { id: 'face-7', name: '👥 FACE - Seguidores Perfil Pessoal', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Seguidores para perfil pessoal' },
    { id: 'face-8', name: '📄 FACE - Seguidores Para Página', price: '0.35', minOrder: 10, maxOrder: 5000000, description: 'Seguidores para páginas' },
    { id: 'face-9', name: '👍 FACE - Gostos em Página', price: '0.30', minOrder: 10, maxOrder: 5000000, description: 'Gostos em páginas' },
    { id: 'face-10', name: '👍 FACE - Curtidas em Publicação', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Curtidas em publicações' },
    { id: 'face-11', name: '🎥 FACE - Visualização em Vídeo', price: '0.20', minOrder: 100, maxOrder: 100000000, description: 'Visualizações em vídeos' },
    { id: 'face-12', name: '👍 FACE - Reação em publicações', price: '0.30', minOrder: 10, maxOrder: 5000000, description: 'Reações em publicações' },
    { id: 'face-13', name: '💬 FACE - Comentários', price: '0.45', minOrder: 1, maxOrder: 1000, description: 'Comentários personalizados' },
    { id: 'face-14', name: '📖 FACE - Visualização em Story', price: '0.15', minOrder: 100, maxOrder: 100000000, description: 'Visualizações em stories' }
  ],
  tiktok: [
    { id: 'tiktok-1', name: '👥 TIKTOK - Seguidores Portugal', price: '0.60', minOrder: 10, maxOrder: 5000000, description: 'Seguidores portugueses' },
    { id: 'tiktok-2', name: '🌍 TIKTOK - Seguidores por Gênero', price: '0.55', minOrder: 10, maxOrder: 5000000, description: 'Seguidores por gênero' },
    { id: 'tiktok-3', name: '🌎 TIKTOK - Seguidores Mundiais', price: '0.50', minOrder: 10, maxOrder: 5000000, description: 'Seguidores mundiais' },
    { id: 'tiktok-4', name: '👍 TIKTOK - Gostos', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Gostos no TikTok' },
    { id: 'tiktok-5', name: '👁️ TIKTOK - Visualização em Vídeo', price: '0.20', minOrder: 100, maxOrder: 100000000, description: 'Visualizações em vídeos' },
    { id: 'tiktok-6', name: '🛠️ TIKTOK - Serviços', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Serviços diversos' },
    { id: 'tiktok-7', name: '💬 TIKTOK - Comentários', price: '0.45', minOrder: 1, maxOrder: 1000, description: 'Comentários personalizados' },
    { id: 'tiktok-8', name: '✅ TIKTOK - Comentário Verificado', price: '0.70', minOrder: 1, maxOrder: 1000, description: 'Comentários de perfis verificados' }
  ],
  twitter: [
    { id: 'twitter-1', name: '👥 TWITTER - Seguidores', price: '0.55', minOrder: 10, maxOrder: 5000000, description: 'Seguidores no Twitter' },
    { id: 'twitter-2', name: '👍 TWITTER - Likes', price: '0.30', minOrder: 10, maxOrder: 5000000, description: 'Likes no Twitter' },
    { id: 'twitter-3', name: '🔄 TWITTER - Retweets', price: '0.40', minOrder: 10, maxOrder: 5000000, description: 'Retweets' }
  ],
  twitch: [
    { id: 'twitch-1', name: '👥 TWITCH - Seguidores', price: '0.50', minOrder: 10, maxOrder: 5000000, description: 'Seguidores no Twitch' },
    { id: 'twitch-2', name: '🛠️ TWITCH - Serviços', price: '0.45', minOrder: 10, maxOrder: 5000000, description: 'Serviços diversos' },
    { id: 'twitch-3', name: '📺 TWITCH - Telespectadores em Live', price: '0.60', minOrder: 10, maxOrder: 10000, description: 'Telespectadores em lives' }
  ],
  telegram: [
    { id: 'telegram-1', name: '👥 TELEGRAM - Seguidores', price: '0.35', minOrder: 10, maxOrder: 5000000, description: 'Seguidores no Telegram' },
    { id: 'telegram-2', name: '👍 TELEGRAM - Reações', price: '0.25', minOrder: 10, maxOrder: 5000000, description: 'Reações no Telegram' }
  ],
  kwai: [
    { id: 'kwai-1', name: '👥 KAWAI - Seguidores', price: '0.45', minOrder: 10, maxOrder: 5000000, description: 'Seguidores no Kwai' },
    { id: 'kwai-2', name: '👍 KAWAI - Gostos', price: '0.30', minOrder: 10, maxOrder: 5000000, description: 'Gostos no Kwai' },
    { id: 'kwai-3', name: '👁️ KAWAI - Visualizações em Vídeo', price: '0.20', minOrder: 100, maxOrder: 100000000, description: 'Visualizações em vídeos' }
  ]
};
