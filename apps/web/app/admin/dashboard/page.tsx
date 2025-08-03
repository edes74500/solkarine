import AddDungeonForm from "@/app/admin/dashboard/composant/dungeon/AddDungeonForm";
import DungeonList from "./composant/dungeon/DungeonList";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <AddDungeonForm />
      <DungeonList />
    </div>
  );
}
