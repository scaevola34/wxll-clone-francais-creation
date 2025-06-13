import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Petit bouton rond qui apparaît après 300 px de scroll
 * et fait défiler la page vers le haut en douceur.
 */
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();                         // premier calcul
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return visible ? (
    <button
      onClick={goTop}
      aria-label="Revenir en haut"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors"
    >
      <ArrowUp size={20} />
    </button>
  ) : null;
};

export default ScrollToTopButton;
