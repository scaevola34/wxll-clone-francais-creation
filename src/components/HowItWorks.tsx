
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageCircle, Palette, Shield, Star, Handshake } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-wxll-artist" />,
      title: "Trouvez l'artiste parfait",
      description: "Parcourez notre galerie d'artistes vérifiés et découvrez celui qui correspond à votre vision artistique.",
      details: "Filtrez par style, localisation et budget pour trouver l'artiste idéal pour votre projet."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-wxll-wall-owner" />,
      title: "Échangez en direct",
      description: "Discutez directement avec l'artiste pour affiner votre projet et établir les détails de la collaboration.",
      details: "Notre messagerie intégrée facilite les échanges et permet de partager des références visuelles."
    },
    {
      icon: <Palette className="w-8 h-8 text-wxll-blue" />,
      title: "Création de l'œuvre",
      description: "L'artiste réalise votre fresque sur mesure, en respectant vos attentes et son style unique.",
      details: "Suivez l'avancement de votre projet et recevez des photos des étapes de création."
    },
    {
      icon: <Star className="w-8 h-8 text-wxll-artist" />,
      title: "Admirer le résultat",
      description: "Profitez de votre nouvelle œuvre d'art urbain qui transforme votre espace en galerie unique.",
      details: "Partagez votre satisfaction et aidez la communauté en laissant un avis sur l'artiste."
    }
  ];

  const guarantees = [
    {
      icon: <Shield className="w-6 h-6 text-wxll-blue" />,
      title: "Artistes vérifiés",
      description: "Tous nos artistes sont sélectionnés pour leur talent et leur professionnalisme"
    },
    {
      icon: <Handshake className="w-6 h-6 text-wxll-blue" />,
      title: "Paiement sécurisé",
      description: "Transactions protégées avec paiement échelonné selon l'avancement"
    },
    {
      icon: <Star className="w-6 h-6 text-wxll-blue" />,
      title: "Satisfaction garantie",
      description: "Support client dédié pour vous accompagner tout au long du projet"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-wxll-light/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            WXLLSPACE simplifie la rencontre entre artistes talentueux et propriétaires de murs. 
            En quelques étapes, transformez votre espace en œuvre d'art unique.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-wxll-blue/30 to-transparent z-0" />
              )}
              
              <Card className="relative z-10 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-wxll-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="p-4 bg-gradient-to-br from-wxll-light/20 to-wxll-blue/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-wxll-dark mb-3 group-hover:text-wxll-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-wxll-dark mb-4">
              Pourquoi choisir WXLLSPACE ?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme sécurisée qui met la qualité et la confiance au cœur de chaque collaboration artistique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-wxll-blue/10 rounded-xl group-hover:bg-wxll-blue/20 transition-colors">
                    {guarantee.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-wxll-dark mb-2">
                  {guarantee.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-wxll-blue/10 text-wxll-blue px-6 py-3 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Rejoignez plus de {steps.length * 250}+ utilisateurs satisfaits</span>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Prêt à donner vie à votre projet artistique ? Commencez dès maintenant et découvrez 
            le potentiel créatif de votre mur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
