import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  // Placeholder posts para demonstração
  const placeholderPosts: InstagramPost[] = [
    {
      id: '1',
      media_url: '/lovable-uploads/00b6d85a-1c9d-4ff3-9e87-35129b65ec78.png',
      permalink: 'https://instagram.com/p/example1',
      caption: 'Design thinking em ação! 🎨 #design #ux #creative',
      media_type: 'IMAGE'
    },
    {
      id: '2', 
      media_url: '/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg',
      permalink: 'https://instagram.com/p/example2',
      caption: 'Explorando novas interfaces 🚀 #ui #interface #innovation',
      media_type: 'IMAGE'
    },
    {
      id: '3',
      media_url: '/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg', 
      permalink: 'https://instagram.com/p/example3',
      caption: 'Behind the scenes do processo criativo ✨ #process #creative #work',
      media_type: 'IMAGE'
    },
    {
      id: '4',
      media_url: '/lovable-uploads/00b6d85a-1c9d-4ff3-9e87-35129b65ec78.png',
      permalink: 'https://instagram.com/p/example4',
      caption: 'Protótipo em desenvolvimento 🔧 #prototype #development',
      media_type: 'IMAGE'
    },
    {
      id: '5',
      media_url: '/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg',
      permalink: 'https://instagram.com/p/example5', 
      caption: 'Inspiração do dia 💡 #inspiration #design #creativity',
      media_type: 'IMAGE'
    },
    {
      id: '6',
      media_url: '/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg',
      permalink: 'https://instagram.com/p/example6',
      caption: 'Experiência do usuário em foco 👤 #ux #userexperience', 
      media_type: 'IMAGE'
    },
    {
      id: '7',
      media_url: '/lovable-uploads/00b6d85a-1c9d-4ff3-9e87-35129b65ec78.png',
      permalink: 'https://instagram.com/p/example7',
      caption: 'Cor e tipografia 🎨 #color #typography #visualdesign',
      media_type: 'IMAGE'
    },
    {
      id: '8',
      media_url: '/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg',
      permalink: 'https://instagram.com/p/example8',
      caption: 'Projeto finalizado! 🎉 #project #complete #success',
      media_type: 'IMAGE'
    }
  ];

  useEffect(() => {
    // Simula carregamento da API do Instagram
    const timer = setTimeout(() => {
      setPosts(placeholderPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-muted/20 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
          onMouseEnter={() => setHoveredPost(post.id)}
          onMouseLeave={() => setHoveredPost(null)}
          onClick={() => window.open(post.permalink, '_blank')}
        >
          <img
            src={post.media_url}
            alt={post.caption || 'Instagram post'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay com informações do post */}
          <AnimatePresence>
            {hoveredPost === post.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
              >
                <div className="text-center text-white">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-sm">Ver no Instagram</span>
                    </div>
                  </div>
                  {post.caption && (
                    <p className="text-xs opacity-90 line-clamp-3">
                      {post.caption.length > 60 
                        ? `${post.caption.substring(0, 60)}...` 
                        : post.caption
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default InstagramFeed;