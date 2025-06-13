
import React, { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header avec espacement amélioré */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">❓</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            FAQ <span className="text-wxll-blue">Wxllspace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trouvez toutes les réponses à vos questions sur notre plateforme de street art
          </p>
        </div>

        {/* FAQ Accordion avec design amélioré */}
        <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className={`border-b border-gray-100 ${idx === faqData.length - 1 ? 'border-b-0' : ''}`}
              >
                <AccordionTrigger className="px-8 py-6 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-lg text-gray-900 leading-relaxed">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 pt-2">
                  <div className="text-gray-700 leading-relaxed text-base border-l-4 border-wxll-blue pl-6 bg-gray-50 p-4 rounded-r-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Section contact avec espacement */}
        <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Notre équipe est là pour vous aider !
          </p>
          <button className="bg-wxll-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            Nous contacter
          </button>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
