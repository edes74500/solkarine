import { format, subHours } from "date-fns";

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
      // Créer les dates avec date-fns
      const startDateSeoul = new Date(
        parseInt(startMatch[1]),
        parseInt(startMatch[2]) - 1,
        parseInt(startMatch[3]),
        parseInt(startMatch[4]),
        parseInt(startMatch[5]),
      );

      const endDateSeoul = new Date(
        parseInt(endMatch[1]),
        parseInt(endMatch[2]) - 1,
        parseInt(endMatch[3]),
        parseInt(endMatch[4]),
        parseInt(endMatch[5]),
      );

      // Calculer le décalage horaire en tenant compte des heures d'été/hiver
      // Séoul est toujours à UTC+9
      const seoulOffset = 9;

      // Obtenir le décalage horaire français actuel (UTC+1 ou UTC+2 selon l'heure d'été/hiver)
      const frenchOffset = -(new Date().getTimezoneOffset() / 60);

      // Calculer la différence entre les deux fuseaux horaires
      const hourDifference = seoulOffset - frenchOffset;

      // Convertir de l'heure de Séoul à l'heure française en tenant compte du décalage
      const startDateFrance = subHours(startDateSeoul, hourDifference);
      const endDateFrance = subHours(endDateSeoul, hourDifference);

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
        startTime: format(startDateFrance, "HH:mm"),
        endTime: format(endDateFrance, "HH:mm"),
      });
    }
  });

  // Trier les événements par jour de la semaine (lundi en premier)
  return events.sort((a, b) => a.dayOrder - b.dayOrder);
};
