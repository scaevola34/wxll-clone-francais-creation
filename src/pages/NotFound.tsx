
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-wxll-light py-20">
        <div className="text-center max-w-md px-4">
          <div className="flex justify-center mb-6">
            <AlertTriangle size={64} className="text-wxll-blue" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-wxll-dark">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oups ! La page que vous recherchez n'existe pas.
          </p>
          <Link to="/">
            <Button className="btn-primary">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
