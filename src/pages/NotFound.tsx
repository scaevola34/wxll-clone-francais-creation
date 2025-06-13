
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
      <div className="text-center max-w-md px-6">
        <div className="flex justify-center mb-8">
          <AlertTriangle size={80} className="text-wxll-blue" />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Oups ! La page que vous recherchez n'existe pas.
        </p>
        <Link to="/">
          <Button className="bg-wxll-blue hover:bg-blue-600 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
