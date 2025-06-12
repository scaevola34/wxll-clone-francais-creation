import React from "react";

const Apropos: React.FC = () => {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">À propos de Wxllspace</h1>
      <p className="mb-4">
        Créée par Antonin, passionné d’art urbain et fondateur du compte{" "}
        <a
          href="https://www.instagram.com/bibstreet/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          @bibstreet
        </a>
        , Wxllspace est née d’un constat simple : les artistes ont besoin de visibilité et d’opportunités concrètes pour créer, et les espaces vacants ne demandent qu’à être réinventés.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">🎨 Une vision : connecter les murs aux mains qui les font vivre</h2>
      <p className="mb-4">
        Wxllspace facilite la mise en relation entre deux communautés qui partagent une même envie : révéler le potentiel artistique de tous les territoires.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-3">Les artistes y présentent leur univers, leur zone d’intervention, leurs œuvres et leurs influences.</li>
        <li className="mb-3">
          Les propriétaires – particuliers, collectivités, entreprises, bailleurs, agriculteurs, maisons de retraite ou écoles – peuvent proposer un mur à transformer (extérieur ou intérieur), en précisant les contraintes : localisation, dimensions, budget, accessibilité, timing…
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">🚀 Une mission : valoriser l’art partout, pour tous</h2>
      <p className="mb-4">Wxllspace s’engage à :</p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-3">Encourager l’expression artistique dans tous les lieux : métropoles, villages, zones industrielles, friches, écoles, bâtiments agricoles, etc.</li>
        <li className="mb-3">Créer des collaborations humaines et durables entre artistes et commanditaires.</li>
        <li className="mb-3">Favoriser un art accessible, légal et valorisé.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">🔒 Une plateforme pensée pour la confiance</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-3">Profils vérifiés pour les artistes comme les propriétaires</li>
        <li className="mb-3">Sécurisation des données via Supabase et gestion des accès</li>
        <li className="mb-3">Projets cadrés avec contrat, budget et calendrier clair</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">💡 Pourquoi Wxllspace ?</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-3">Parce que chaque mur est une opportunité d’expression.</li>
        <li className="mb-3">Parce que l’art urbain mérite de sortir de l’ombre, même loin de la ville.</li>
        <li className="mb-3">Parce que les plus belles fresques naissent parfois là où on ne les attend pas.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">📲 Rejoignez la communauté</h2>
      <p>
        Que vous soyez artiste muraliste ou propriétaire d’un mur à sublimer, en milieu urbain ou rural, Wxllspace est votre terrain d’expression.
      </p>
    </main>
  );
};

export default Apropos;
