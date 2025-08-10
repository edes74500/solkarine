import UpdateStreamSchedule from "@/app/admin/dashboard/help/components/UpdateStreamSchedule";
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
      id: "update-stream-schedule",
      title: "Comment mettre à jour les horaires de stream",
      content: <UpdateStreamSchedule />,
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
