
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
import { User, Edit, LogOut, PlusCircle, Image } from 'lucide-react';

const ArtistDashboard = () => {
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
                    <CardTitle>Sophie Durand</CardTitle>
                    <CardDescription>Artiste street art</CardDescription>
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
                    <Image className="mr-2" size={18} />
                    Mon portfolio
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
                <CardTitle>Mon profil d'artiste</CardTitle>
                <CardDescription>Gérez vos informations personnelles et votre profil public</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" defaultValue="Sophie Durand" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sophie.durand@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input id="location" defaultValue="Paris" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="style">Style artistique</Label>
                    <Input id="style" defaultValue="Graffiti Abstrait" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea 
                      id="bio" 
                      rows={5}
                      defaultValue="Artiste urbaine passionnée par les formes abstraites et les couleurs vives. Mon travail explore les thèmes de la nature et de l'urbanisation."
                    />
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
                  <span>Mon portfolio</span>
                  <Button size="sm">
                    <PlusCircle className="mr-2" size={16} />
                    Ajouter une œuvre
                  </Button>
                </CardTitle>
                <CardDescription>Gérez les œuvres présentées sur votre profil public</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="relative group">
                      <div className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${item}/300/300`} 
                          alt={`Œuvre ${item}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="ghost" className="text-white">
                          <Edit size={18} />
                        </Button>
                      </div>
                    </div>
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

export default ArtistDashboard;
