import React, { useState } from "react";

const faqData = [
  {
    question: "Qu'est-ce que Wxllspace ?",
    answer:
      "Wxllspace est la première marketplace française dédiée au street art, connectant artistes, propriétaires de murs et amateurs d'art urbain.",
  },
  {
    question: "Comment puis-je m'inscrire en tant qu'artiste ?",
    answer:
      "Vous pouvez vous inscrire via la page d'inscription en choisissant le rôle 'artiste' et en complétant votre profil pour présenter votre univers et vos œuvres.",
  },
  {
    question: "Comment proposer un mur à décorer ?",
    answer:
      "Les propriétaires peuvent proposer un mur en créant un compte propriétaire et en renseignant les détails du mur : localisation, dimensions, budget, accessibilité, etc.",
  },
  {
    question: "Les profils sont-ils vérifiés ?",
    answer:
      "Oui, Wxllspace vérifie les profils des artistes et des propriétaires pour garantir la confiance et la qualité des collaborations.",
  },
  {
    question: "Comment fonctionne la mise en relation entre artistes et propriétaires ?",
    answer:
      "La plateforme facilite la mise en relation directe via des messages sécurisés et un suivi des projets avec contrat, budget et calendrier clair.",
  },
  {
    question: "Puis-je vendre mes œuvres sur Wxllspace ?",
    answer:
      "Oui, les artistes peuvent présenter et vendre leurs créations directement sur la marketplace.",
  },
  {
    question: "Quelles sont les zones géographiques couvertes ?",
    answer:
      "Wxllspace valorise l'art urbain partout, en milieu urbain comme rural, dans les villes, villages, zones industrielles, et plus encore.",
  },
  {
    question: "Comment mes données sont-elles protégées ?",
    answer:
      "Wxllspace utilise Supabase pour sécuriser les données et gérer les accès, garantissant la confidentialité et la sécurité.",
  },
  {
    question: "Que faire en cas de problème ou de litige ?",
    answer:
      "Un support est disponible pour accompagner les utilisateurs et résoudre les éventuels litiges liés aux projets.",
  },
  {
    question: "Comment contacter l'équipe Wxllspace ?",
    answer:
      "Vous pouvez nous contacter via la page Contact ou sur nos réseaux sociaux listés dans le footer.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 text-center">FAQ Wxllspace</h1>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl shadow-sm bg-white transition-all duration-200"
          >
            <button
              className="w-full text-left px-6 py-5 focus:outline-none flex justify-between items-center group"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="font-semibold text-gray-800 text-lg">{item.question}</span>
              <svg
                className={`w-6 h-6 text-purple-600 transform transition-transform duration-200 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx ? "max-h-96 opacity-100 py-4 px-6" : "max-h-0 opacity-0 px-6"
              }`}
              style={{ background: openIndex === idx ? "#faf5ff" : "white" }}
            >
              <div className="text-gray-700">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FAQ;
