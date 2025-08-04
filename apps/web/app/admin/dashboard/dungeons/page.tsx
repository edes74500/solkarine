import AddDungeonForm from "./components/AddDungeonForm";
import DungeonList from "./components/DungeonList";

export default function Dungeons() {
  return (
    <div className="flex flex-col gap-4">
      <AddDungeonForm />
      <DungeonList />
    </div>
  );
}
