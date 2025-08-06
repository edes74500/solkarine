import AddCharacterSection from "@/app/admin/dashboard/characters/AddCharacterSection";
import { CharacterList } from "@/app/admin/dashboard/characters/CharacterList";

export default function CharactersPage() {
  return (
    <section className="dashboard-section">
      <h1>Gestion des personnages</h1>
      <AddCharacterSection />
      <CharacterList />
    </section>
  );
}
