import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Users, MapPin } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Section Hero - CORRIGÉE */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Image de fond avec overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        
        {/* Contenu principal - HAUTEUR FLEXIBLE */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Révolutionnez vos murs{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              avec l'art urbain
            </span>
          </h1>
          
          {/* Description - HAUTEUR AUTOMATIQUE */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            La marketplace qui met en relation street artists et propriétaires de murs pour créer des œuvres uniques.
          </p>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Link to="/artistes">
                Découvrir les artistes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/murs">
                Proposer un mur
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section statistiques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Palette className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Artistes vérifiés</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Propriétaires actifs</p>
            </div>
            
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">75+</h3>
              <p className="text-gray-600">Villes couvertes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Comment ça marche ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Inscrivez-vous</h3>
              <p className="text-gray-600">Créez votre profil artiste ou propriétaire en quelques clics</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Connectez-vous</h3>
              <p className="text-gray-600">Trouvez l'artiste parfait ou le mur idéal pour votre projet</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Créez ensemble</h3>
              <p className="text-gray-600">Réalisez des œuvres uniques qui transforment l'espace urbain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action final */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à révolutionner l'art urbain ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez WXLLSPACE et participez à la transformation artistique de nos villes
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            <Link to="/register">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

