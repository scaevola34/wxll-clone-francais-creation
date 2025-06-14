
import React from "react";
import { Users, Paintbrush, ShieldCheck, Lightbulb, MapPin, Award, Heart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Apropos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              À propos de <span className="text-purple-300">Wxllspace</span>
            </h1>
            <p className="text-xl leading-relaxed mb-8">
              La plateforme qui révolutionne l'art urbain en connectant artistes talentueux 
              et propriétaires visionnaires pour transformer nos espaces de vie.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Plateforme certifiée</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Communauté engagée</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span>Projets de qualité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Notre Histoire */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Créée par Antonin, passionné d'art urbain et fondateur du compte{" "}
                    <a
                      href="https://www.instagram.com/bibstreet/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline font-medium"
                    >
                      @bibstreet
                    </a>
                    , Wxllspace est née d'un constat simple : les artistes ont besoin de visibilité 
                    et d'opportunités concrètes pour créer.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Parallèlement, de nombreux espaces vacants ne demandent qu'à être réinventés 
                    pour retrouver une âme et embellir notre quotidien.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop" 
                    alt="Art urbain" 
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notre Mission en cartes */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecter les murs aux mains qui les font vivre
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Paintbrush className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pour les Artistes</h3>
                <p className="text-gray-600">
                  Présenter votre univers, votre zone d'intervention et vos œuvres 
                  pour trouver de nouveaux projets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pour les Propriétaires</h3>
                <p className="text-gray-600">
                  Proposer un mur à transformer en précisant vos contraintes : 
                  budget, dimensions, timing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Plateforme Sécurisée</h3>
                <p className="text-gray-600">
                  Profils vérifiés, projets cadrés avec contrat et 
                  gestion sécurisée des échanges.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-purple-200" />
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-purple-100">
                    Révéler le potentiel artistique de tous les territoires, 
                    des métropoles aux villages.
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-purple-200" />
                  <h3 className="text-xl font-bold mb-2">Communauté</h3>
                  <p className="text-purple-100">
                    Créer des collaborations humaines et durables entre 
                    artistes et commanditaires.
                  </p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-purple-200" />
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-purple-100">
                    Favoriser un art accessible, légal et valorisé 
                    pour tous les publics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rejoignez la Révolution Artistique
              </h2>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Que vous soyez artiste muraliste ou propriétaire d'un mur à sublimer, 
                Wxllspace est votre terrain d'expression.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Devenir Artiste
                </a>
                <a 
                  href="/register" 
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Proposer un Mur
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Apropos;
