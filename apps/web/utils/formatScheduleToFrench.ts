export const formatScheduleToFrench = (icalData: string): any[] => {
  const events: any[] = [];
  const eventBlocks = icalData.split("BEGIN:VEVENT");

  eventBlocks.shift(); // Supprimer le premier élément qui n'est pas un événement

  eventBlocks.forEach((block) => {
    const summary = block.match(/SUMMARY:(.*)/)?.[1]?.trim();
    const description = block.match(/DESCRIPTION:(.*)/)?.[1]?.trim();
    const startMatch = block.match(/DTSTART;TZID=\/Asia\/Seoul:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
    const endMatch = block.match(/DTEND;TZID=\/Asia\/Seoul:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
    const rrule = block.match(/RRULE:(.*)/)?.[1]?.trim();

    if (startMatch && endMatch && summary) {
      // Convertir les heures de Séoul (UTC+9) en heures françaises (UTC+1)
      // Différence de 8 heures
      const startYear = parseInt(startMatch[1]);
      const startMonth = parseInt(startMatch[2]) - 1; // Les mois commencent à 0 en JS
      const startDay = parseInt(startMatch[3]);
      const startHour = parseInt(startMatch[4]);
      const startMinute = parseInt(startMatch[5]);

      const endYear = parseInt(endMatch[1]);
      const endMonth = parseInt(endMatch[2]) - 1;
      const endDay = parseInt(endMatch[3]);
      const endHour = parseInt(endMatch[4]);
      const endMinute = parseInt(endMatch[5]);

      const startDateSeoul = new Date(startYear, startMonth, startDay, startHour, startMinute);
      const endDateSeoul = new Date(endYear, endMonth, endDay, endHour, endMinute);

      // Convertir de l'heure de Séoul à l'heure française (UTC+9 à UTC+1)
      const startDateFrance = new Date(startDateSeoul.getTime() - 8 * 60 * 60 * 1000);
      const endDateFrance = new Date(endDateSeoul.getTime() - 8 * 60 * 60 * 1000);

      // Déterminer le jour de la semaine en français
      let dayOfWeek = "";
      let dayOrder = 0;
      if (rrule) {
        const dayMatch = rrule.match(/BYDAY=([A-Z]{2})/);
        if (dayMatch) {
          switch (dayMatch[1]) {
            case "MO":
              dayOfWeek = "Lundi";
              dayOrder = 1;
              break;
            case "TU":
              dayOfWeek = "Mardi";
              dayOrder = 2;
              break;
            case "WE":
              dayOfWeek = "Mercredi";
              dayOrder = 3;
              break;
            case "TH":
              dayOfWeek = "Jeudi";
              dayOrder = 4;
              break;
            case "FR":
              dayOfWeek = "Vendredi";
              dayOrder = 5;
              break;
            case "SA":
              dayOfWeek = "Samedi";
              dayOrder = 6;
              break;
            case "SU":
              dayOfWeek = "Dimanche";
              dayOrder = 7;
              break;
          }
        }
      }

      events.push({
        summary,
        description,
        startDate: startDateFrance,
        endDate: endDateFrance,
        dayOfWeek,
        dayOrder,
        startTime: `${startDateFrance.getHours().toString().padStart(2, "0")}:${startDateFrance.getMinutes().toString().padStart(2, "0")}`,
        endTime: `${endDateFrance.getHours().toString().padStart(2, "0")}:${endDateFrance.getMinutes().toString().padStart(2, "0")}`,
      });
    }
  });

  // Trier les événements par jour de la semaine (lundi en premier)
  return events.sort((a, b) => a.dayOrder - b.dayOrder);
};
