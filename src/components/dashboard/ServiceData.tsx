
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
    { id: 'insta-pt-1', name: '🇵🇹 INSTA - Seguidores Portugal', price: '0.40' },
    { id: 'insta-pt-2', name: '🇵🇹 INSTA - Seguidores Mistos', price: '0.35' },
    { id: 'insta-pt-3', name: '🌍 INSTA - Seguidores Mundiais', price: '0.30' },
    { id: 'insta-pt-4', name: '☀️ INSTA - Serviços Orgânicos', price: '0.50' },
    { id: 'insta-pt-5', name: '👫 INSTA - Seguidores Genero', price: '0.45' },
    { id: 'insta-pt-6', name: '✅ INSTA - Seguidores Verificados', price: '0.60' },
    { id: 'insta-pt-7', name: '🎁 INSTA - PRESENTE GRÁTIS', price: '0.00' },
    { id: 'insta-pt-8', name: '💚 INSTA - Gostos Portugal', price: '0.25' },
    { id: 'insta-pt-9', name: '❤️ INSTA - Gostos Mundiais', price: '0.20' },
    { id: 'insta-pt-10', name: '✅ INSTA - Gostos Verificadas', price: '0.40' },
    { id: 'insta-pt-11', name: '👁️ INSTA - Visualização em Vídeo', price: '0.15' },
    { id: 'insta-pt-12', name: '🎬 INSTA - Serviços para Story', price: '0.30' },
    { id: 'insta-pt-13', name: '📊 INSTA - Votos em Enquete Story', price: '0.25' }
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
  twitter: [
    { id: 'twitter-1', name: '👥 TWITTER - Seguidores', price: '0.55' },
    { id: 'twitter-2', name: '👍 TWITTER - Likes', price: '0.30' },
    { id: 'twitter-3', name: '🔄 TWITTER - Retweets', price: '0.40' }
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
  ]
};
