
import React from 'react';
import { Palette, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const artistSteps = [
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Créez votre profil",
      description: "Mettez en avant votre style, vos réalisations et votre expertise."
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Trouvez des murs",
      description: "Parcourez les opportunités de fresques et trouvez les projets qui vous correspondent."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "Discutez avec les propriétaires",
      description: "Échangez directement sur la plateforme pour définir votre vision artistique."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Réalisez votre œuvre",
      description: "Concrétisez votre projet une fois les détails finalisés et partagez le résultat."
    }
  ];

  const ownerSteps = [
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Publiez votre mur",
      description: "Décrivez votre espace, vos attentes et votre budget pour attirer les artistes."
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Découvrez des artistes",
      description: "Explorez les profils d'artistes talentueux et leurs styles variés."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "Communiquez vos idées",
      description: "Discutez directement avec les artistes pour définir votre projet."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Transformez votre espace",
      description: "Assistez à la métamorphose de votre mur en œuvre d'art unique."
    }
  ];

  return (
    <section className="py-20 bg-wxll-light">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Comment ça marche</h2>
        <p className="section-subtitle text-center">
          WXLLSPACE connecte facilement les artistes et les propriétaires de murs pour créer des œuvres uniques
        </p>

        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="artist-theme rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center gradient-artist">Pour les Artistes</h3>
              <div className="space-y-8">
                {artistSteps.map((step, index) => (
                  <div key={`artist-${index}`} className="flex items-start group">
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-wxll-artist rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {step.icon}
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-wxll-artist-dark rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-wxll-dark">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wall-owner-theme rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center gradient-wall-owner">Pour les Propriétaires</h3>
              <div className="space-y-8">
                {ownerSteps.map((step, index) => (
                  <div key={`owner-${index}`} className="flex items-start group">
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-wxll-wall-owner rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {step.icon}
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-wxll-wall-owner-dark rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-wxll-dark">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
