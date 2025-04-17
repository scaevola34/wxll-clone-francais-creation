
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { User, Edit, LogOut, PlusCircle, Building, MapPin } from 'lucide-react';

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and user session
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute bottom-0 right-0 rounded-full bg-white"
                    >
                      <Edit size={14} />
                    </Button>
                  </div>
                  <div>
                    <CardTitle>Thomas Moreau</CardTitle>
                    <CardDescription>Propriétaire de mur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2" size={18} />
                    Profil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Building className="mr-2" size={18} />
                    Mes murs
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2" size={18} />
                    Déconnexion
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main content */}
          <main className="md:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" defaultValue="Thomas Moreau" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="thomas.moreau@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+33 6 98 76 54 32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise (optionnel)</Label>
                      <Input id="company" defaultValue="Café Le Parisien" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Annuler</Button>
                <Button>Sauvegarder</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Mes murs</span>
                  <Button size="sm">
                    <PlusCircle className="mr-2" size={16} />
                    Ajouter un mur
                  </Button>
                </CardTitle>
                <CardDescription>Gérez vos murs disponibles pour les artistes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <Card key={item}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full bg-gray-200">
                            <img 
                              src={`https://images.unsplash.com/photo-${item === 1 ? '1555680202-c86f0e12f086' : '1566159266269-2ecbc9a5d4c6'}?q=80&w=300&auto=format&fit=crop`}
                              alt={`Mur ${item}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3 p-4">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg">
                              {item === 1 ? "Façade de café" : "Mur extérieur d'atelier"}
                            </h3>
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin size={16} className="mr-1" />
                            {item === 1 ? "Paris, 11ème" : "Lyon, Centre"}
                          </div>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-2">
                              {item === 1 ? "Extérieur" : "Intérieur"}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {item === 1 ? "B2C" : "B2B"}
                            </span>
                          </div>
                          <p className="text-sm mt-2">
                            {item === 1 
                              ? "Façade de café donnant sur une rue passante. Bonne visibilité. Idéal pour une fresque colorée." 
                              : "Mur intérieur de notre atelier créatif. Recherche une œuvre inspirante pour notre équipe."}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <div>
                              <span className="text-sm font-medium">Dimensions:</span>
                              <span className="text-sm ml-2">{item === 1 ? "8m x 4m" : "6m x 3m"}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Budget:</span>
                              <span className="text-sm ml-2">{item === 1 ? "2000€ - 3500€" : "1500€ - 2500€"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
