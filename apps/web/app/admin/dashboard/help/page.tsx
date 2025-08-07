import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";
import PostOnWago from "./components/PostOnWago";

interface HelpItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function HelpPage() {
  const helpItems: HelpItem[] = [
    {
      id: "post-on-wago",
      title: "Comment publier une WeakAura sur Wago.io",
      content: <PostOnWago />,
    },
    {
      id: "profile-management",
      title: "Comment gérer mon profil",
      content: (
        <div className="space-y-4">
          <p>Pour gérer votre profil, suivez ces étapes simples :</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Accédez à la section "Profil" depuis le tableau de bord</li>
            <li>Cliquez sur "Modifier le profil" pour changer vos informations</li>
            <li>Mettez à jour votre photo, description et autres détails</li>
            <li>N'oubliez pas de sauvegarder vos modifications</li>
          </ol>
        </div>
      ),
    },
    {
      id: "create-article",
      title: "Comment créer un nouvel article",
      content: (
        <div className="space-y-4">
          <p>Pour créer un nouvel article sur le site :</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Naviguez vers la section "Articles" dans le menu latéral</li>
            <li>Cliquez sur le bouton "Nouvel article"</li>
            <li>Remplissez le formulaire avec le titre, le contenu et les images</li>
            <li>Sélectionnez les catégories appropriées</li>
            <li>Prévisualisez votre article avant de le publier</li>
            <li>Cliquez sur "Publier" lorsque vous êtes prêt</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <section className="dashboard-section">
      <h1>Aide</h1>

      <Accordion type="single" collapsible className="w-full">
        {helpItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
