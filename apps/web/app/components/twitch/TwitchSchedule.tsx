"use client";

import { formatScheduleToFrench } from "@/utils/formatScheduleToFrench";
import { useEffect, useState } from "react";

export default function TwitchSchedule({ icalData }: { icalData: string }) {
  const [schedule, setSchedule] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (icalData) {
          const formattedSchedule = formatScheduleToFrench(icalData);
          setSchedule(formattedSchedule);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du planning:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Fonction pour formater les données iCal en format français

  if (loading) {
    return <div className="text-center py-4">Chargement du planning...</div>;
  }

  if (!schedule || schedule.length === 0) {
    return <div className="text-center py-4">Aucun planning disponible pour le moment.</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {schedule.map((event, index) => (
        <div key={index} className="bg-card p-3 rounded-lg border border-border shadow-md">
          <p className="font-bold">{event.dayOfWeek}</p>
          <p className="text-sm text-muted-foreground">
            {event.startTime} - {event.endTime}
          </p>
          <p className="text-sm mt-1">{event.summary}</p>
        </div>
      ))}
    </div>
  );
}
