import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import DungeonList from "./components/DungeonList";

export default function Dungeons() {
  return (
    <section className="dashboard-section">
      <h1>Gestion des donjons</h1>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Cette section vous permet de renommer les donjons, changer les timers ou les images. Ces modifications
          n&apos;auront qu&apos;un impact visuel sur l&apos;application.
        </AlertDescription>
      </Alert>
      {/* <EditDungeon /> */}
      <DungeonList />
    </section>
  );
}
