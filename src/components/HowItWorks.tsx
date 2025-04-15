
import React from 'react';
import { Palette, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const artistSteps = [
    {
      icon: <Palette className="w-12 h-12 text-wxll-blue" />,
      title: "Créez votre profil",
      description: "Mettez en avant votre style, vos réalisations et votre expertise."
    },
    {
      icon: <MapPin className="w-12 h-12 text-wxll-blue" />,
      title: "Trouvez des murs",
      description: "Parcourez les opportunités de fresques et trouvez les projets qui vous correspondent."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-wxll-blue" />,
      title: "Discutez avec les propriétaires",
      description: "Échangez directement sur la plateforme pour définir votre vision artistique."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-wxll-blue" />,
      title: "Réalisez votre œuvre",
      description: "Concrétisez votre projet une fois les détails finalisés et partagez le résultat."
    }
  ];

  const ownerSteps = [
    {
      icon: <MapPin className="w-12 h-12 text-wxll-blue" />,
      title: "Publiez votre mur",
      description: "Décrivez votre espace, vos attentes et votre budget pour attirer les artistes."
    },
    {
      icon: <Palette className="w-12 h-12 text-wxll-blue" />,
      title: "Découvrez des artistes",
      description: "Explorez les profils d'artistes talentueux et leurs styles variés."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-wxll-blue" />,
      title: "Communiquez vos idées",
      description: "Discutez directement avec les artistes pour définir votre projet."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-wxll-blue" />,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Pour les Artistes</h3>
              <div className="space-y-12">
                {artistSteps.map((step, index) => (
                  <div key={`artist-${index}`} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">{step.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Pour les Propriétaires</h3>
              <div className="space-y-12">
                {ownerSteps.map((step, index) => (
                  <div key={`owner-${index}`} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">{step.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
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
