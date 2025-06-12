import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const FAQ = () => {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">FAQ Wxllspace</h2>
      <ScrollArea className="h-[75vh] rounded-md border p-4">
        <Accordion type="multiple" className="w-full">
          {/* Artistes */}
          <AccordionItem value="artist-1" title="Qui peut créer un profil artiste ?">
            Tout artiste urbain peut s’inscrire, qu’il soit professionnel, amateur ou en voie de professionnalisation.
          </AccordionItem>
          <AccordionItem value="artist-2" title="Dois-je être déclaré ou avoir un statut pro ?">
            Non, mais si le mur est rémunéré, tu es responsable de déclarer tes revenus selon ton statut.
          </AccordionItem>
          <AccordionItem value="artist-3" title="Comment se passe la mise en relation avec un propriétaire ?">
            Tu peux envoyer une proposition (style, format, délai, budget). Le propriétaire peut accepter ou ajuster.
          </AccordionItem>
          <AccordionItem value="artist-4" title="Suis-je couvert en cas d’accident ?">
            Non par défaut. Une assurance responsabilité civile est recommandée.
          </AccordionItem>
          <AccordionItem value="artist-5" title="Qui possède les droits sur l’œuvre ?">
            L’artiste reste titulaire. Une convention peut encadrer l’usage par le propriétaire.
          </AccordionItem>
          <AccordionItem value="artist-6" title="Et si mon œuvre est effacée ?">
            Wxllspace ne garantit pas la pérennité. Une discussion en amont permet de cadrer.
          </AccordionItem>

          {/* Propriétaires Particuliers */}
          <AccordionItem value="owner-1" title="Mon mur est-il éligible ?">
            Oui, s’il est stable, accessible et que vous êtes propriétaire ou autorisé.
          </AccordionItem>
          <AccordionItem value="owner-2" title="Dois-je rémunérer l’artiste ?">
            Pas obligatoirement. Cela dépend de l’accord trouvé entre vous.
          </AccordionItem>
          <AccordionItem value="owner-3" title="Y a-t-il un risque de nuisance ?">
            Non, les artistes sont là pour créer une œuvre. Une convention peut tout cadrer.
          </AccordionItem>
          <AccordionItem value="owner-4" title="Puis-je choisir un style ?">
            Oui, vous pouvez exprimer vos souhaits artistiques dans le formulaire.
          </AccordionItem>
          <AccordionItem value="owner-5" title="Et si l’œuvre ne me plaît pas ?">
            La maquette est validée en amont. Vous êtes libre de refuser une proposition.
          </AccordionItem>
          <AccordionItem value="owner-6" title="Dois-je prévoir une assurance ?">
            Oui, notamment en cas d’utilisation de nacelle ou échafaudage.
          </AccordionItem>

          {/* Collectivités & Pros */}
          <AccordionItem value="pro-1" title="Puis-je faire appel à plusieurs artistes ?">
            Oui. Contactez-nous si vous souhaitez lancer un appel à projets.
          </AccordionItem>
          <AccordionItem value="pro-2" title="L’œuvre devient-elle ma propriété ?">
            Non sauf contrat de cession. Une autorisation d’usage peut être convenue.
          </AccordionItem>
          <AccordionItem value="pro-3" title="Y a-t-il une charte pour les lieux publics ?">
            Oui, selon le site (zone classée, contraintes urbaines). Des autorisations peuvent être requises.
          </AccordionItem>
          <AccordionItem value="pro-4" title="Proposez-vous des conventions types ?">
            Oui, pour cadrer la responsabilité, durée, droits, conditions financières…
          </AccordionItem>

          {/* Sécurité et fonctionnement général */}
          <AccordionItem value="sec-1" title="Comment sont sécurisées mes données ?">
            Les données sont stockées sur Supabase avec mots de passe chiffrés. Aucun mot de passe n’est stocké en clair.
          </AccordionItem>
          <AccordionItem value="sec-2" title="Que faire en cas d’oubli de mot de passe ?">
            Utilisez le lien “Mot de passe oublié” pour recevoir un lien sécurisé de réinitialisation.
          </AccordionItem>
          <AccordionItem value="sec-3" title="Qui modère les profils ?">
            L’équipe valide manuellement les premiers comptes. Un système de signalement arrive.
          </AccordionItem>
          <AccordionItem value="sec-4" title="Puis-je supprimer mon compte ?">
            Oui. Depuis votre tableau de bord, vous pouvez demander la suppression.
          </AccordionItem>
          <AccordionItem value="sec-5" title="Comment éviter les projets illégaux ?">
            Les projets sans autorisation ou à contenu haineux sont interdits. Wxllspace se réserve le droit de bannir tout compte.
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </section>
  );
};

export default FAQ;

