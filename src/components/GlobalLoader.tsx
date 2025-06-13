import React from "react";
import { useIsFetching } from "@tanstack/react-query";
import Spinner from "@/components/ui/Spinner";
/**
 * Affiche un écran semi-transparent + spinner
 * dès qu'au moins UNE requête React-Query est en cours.
 */
const GlobalLoader: React.FC = () => {
  const fetching = useIsFetching(); // nombre de requêtes actives

  if (!fetching) return null;       // rien à afficher s'il n'y a rien à charger

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <Spinner size={48} />
    </div>
  );
};

export default GlobalLoader;
