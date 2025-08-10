import TwitchSchedule from "@/app/components/twitch/TwitchSchedule";
import { getTwitchSchedule } from "@/lib/api/twitch";

export default async function TwitchScheduleModule() {
  const icalData = await getTwitchSchedule();

  if (!icalData) {
    return <div>No data</div>;
  }

  return (
    <>
      <TwitchSchedule icalData={icalData} />
    </>
  );
}
