
import React from 'react';
import { Palette, MapPin, MessageSquare, CheckCircle, Shield, Users, Clock, Star, Banknote, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  const artistSteps = [
    {
      icon: <Palette className="w-12 h-12 text-wxll-artist" />,
      title: "Créez votre profil",
      description: "Mettez en avant votre style, vos réalisations et votre expertise artistique unique.",
      details: "Ajoutez vos œuvres précédentes, définissez vos spécialités et fixez vos tarifs."
    },
    {
      icon: <Search className="w-12 h-12 text-wxll-artist" />,
      title: "Explorez les opportunités",
      description: "Parcourez les murs disponibles selon vos critères : localisation, budget, style.",
      details: "Filtrez par ville, type de projet et budget pour trouver les missions parfaites."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-wxll-artist" />,
      title: "Échangez avec les propriétaires",
      description: "Discutez directement sur la plateforme pour définir votre vision artistique.",
      details: "Partagez vos idées, négociez les détails et planifiez votre intervention."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-wxll-artist" />,
      title: "Réalisez et partagez",
      description: "Concrétisez votre projet et enrichissez votre portfolio avec chaque nouvelle œuvre.",
      details: "Documentez votre travail et construisez votre réputation sur la plateforme."
    }
  ];

  const ownerSteps = [
    {
      icon: <MapPin className="w-12 h-12 text-wxll-wall-owner" />,
      title: "Publiez votre projet",
      description: "Décrivez votre espace, vos attentes et votre budget pour attirer les bons artistes.",
      details: "Photos, dimensions, style souhaité : plus c'est détaillé, mieux c'est !"
    },
    {
      icon: <Palette className="w-12 h-12 text-wxll-wall-owner" />,
      title: "Recevez des propositions",
      description: "Les artistes vous contactent avec leurs portfolios et devis personnalisés.",
      details: "Comparez les profils, styles et tarifs pour faire le meilleur choix."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-wxll-wall-owner" />,
      title: "Sélectionnez votre artiste",
      description: "Échangez avec les candidats pour affiner votre projet et choisir le bon profil.",
      details: "Discutez des détails techniques, du planning et finalisez l'accord."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-wxll-wall-owner" />,
      title: "Admirez le résultat",
      description: "Suivez l'avancement et découvrez la transformation unique de votre espace.",
      details: "Votre mur devient une œuvre d'art qui valorise votre bien immobilier."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-wxll-blue" />,
      title: "Sécurité garantie",
      description: "Artistes vérifiés, paiements sécurisés et assurance incluse pour tous les projets."
    },
    {
      icon: <Users className="w-8 h-8 text-wxll-blue" />,
      title: "Communauté qualifiée",
      description: "Plus de 500 artistes professionnels avec portfolios vérifiés et avis clients."
    },
    {
      icon: <Clock className="w-8 h-8 text-wxll-blue" />,
      title: "Gain de temps",
      description: "Trouvez le bon artiste en quelques clics plutôt qu'en semaines de recherche."
    },
    {
      icon: <Banknote className="w-8 h-8 text-wxll-blue" />,
      title: "Prix transparents",
      description: "Comparez facilement les devis et négociez en toute transparence."
    },
    {
      icon: <Star className="w-8 h-8 text-wxll-blue" />,
      title: "Qualité assurée",
      description: "Système d'évaluation et suivi de projet pour garantir un résultat exceptionnel."
    },
    {
      icon: <MapPin className="w-8 h-8 text-wxll-blue" />,
      title: "Couverture nationale",
      description: "Artistes disponibles dans toute la France, de Paris aux plus petites villes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-wxll-blue/5 to-wxll-artist/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-wxll-dark">
            Comment fonctionne WXLLSPACE ?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La première marketplace française qui révolutionne la rencontre entre artistes street art 
            et propriétaires de murs. Simple, sécurisé, efficace.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Artists Journey */}
            <div className="artist-theme rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-artist">
                Pour les Artistes
              </h2>
              <div className="space-y-8">
                {artistSteps.map((step, index) => (
                  <div key={`artist-${index}`} className="flex items-start group">
                    <div className="flex-shrink-0 mr-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-wxll-artist rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-wxll-artist-dark rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-wxll-dark">{step.title}</h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-600 italic">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wall Owners Journey */}
            <div className="wall-owner-theme rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-wall-owner">
                Pour les Propriétaires
              </h2>
              <div className="space-y-8">
                {ownerSteps.map((step, index) => (
                  <div key={`owner-${index}`} className="flex items-start group">
                    <div className="flex-shrink-0 mr-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-wxll-wall-owner rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-wxll-wall-owner-dark rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-wxll-dark">{step.title}</h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-600 italic">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-wxll-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-wxll-dark">
              Pourquoi choisir WXLLSPACE ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre marketplace vous offre des avantages uniques par rapport aux méthodes traditionnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-wxll-blue/10 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-wxll-dark">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-wxll-dark text-white py-6 px-8">
              <h3 className="text-2xl font-bold text-center">WXLLSPACE vs Méthodes traditionnelles</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Critère</th>
                    <th className="px-6 py-4 text-center font-semibold text-wxll-blue">WXLLSPACE</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Méthode traditionnelle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Temps de recherche</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">2-3 jours</td>
                    <td className="px-6 py-4 text-center text-red-600 font-semibold">2-4 semaines</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Vérification des artistes</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Systématique</td>
                    <td className="px-6 py-4 text-center text-red-600 font-semibold">✗ À votre charge</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Assurance</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Incluse</td>
                    <td className="px-6 py-4 text-center text-red-600 font-semibold">✗ À souscrire</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Paiement sécurisé</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Garanti</td>
                    <td className="px-6 py-4 text-center text-orange-600 font-semibold">~ Variable</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Support client</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ 7j/7</td>
                    <td className="px-6 py-4 text-center text-red-600 font-semibold">✗ Aucun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wxll-dark via-gray-900 to-wxll-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre vision en réalité ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 500 artistes et 1000+ propriétaires qui nous font déjà confiance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
            <Link to="/">
              <Button size="lg" className="flex-1 btn-artist">
                <Palette className="mr-2 h-5 w-5" />
                Je suis artiste
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" className="flex-1 btn-wall-owner">
                <MapPin className="mr-2 h-5 w-5" />
                J'ai un mur
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
