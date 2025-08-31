// pnpm add date-fns date-fns-tz
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { fr } from "date-fns/locale";

type EventFR = {
  summary: string;
  description?: string;
  startTime: string; // "HH:mm" Paris
  endTime: string; // "HH:mm" Paris
  dayOfWeek: string; // Lundi..Dimanche
  dayOrder: number; // 1..7
  startDate: Date; // Date en Paris
  endDate: Date; // Date en Paris
};

const DAY_MAP: Record<string, { fr: string; order: number }> = {
  MO: { fr: "Lundi", order: 1 },
  TU: { fr: "Mardi", order: 2 },
  WE: { fr: "Mercredi", order: 3 },
  TH: { fr: "Jeudi", order: 4 },
  FR: { fr: "Vendredi", order: 5 },
  SA: { fr: "Samedi", order: 6 },
  SU: { fr: "Dimanche", order: 7 },
};

export const formatScheduleToFrench = (icalData: string): EventFR[] => {
  const events: EventFR[] = [];
  const blocks = icalData.split("BEGIN:VEVENT");
  blocks.shift();

  for (const block of blocks) {
    const summary = block.match(/SUMMARY:(.*)/)?.[1]?.trim();
    const description = block.match(/DESCRIPTION:(.*)/)?.[1]?.trim();
    const rrule = block.match(/RRULE:(.*)/)?.[1]?.trim();

    // Match générique TZID + datetime (supporte "TZID=/Europe/Paris" et sans TZID)
    const startMatch = block.match(/DTSTART(?:;TZID=([^:]+))?:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
    const endMatch = block.match(/DTEND(?:;TZID=([^:]+))?:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
    if (!summary || !startMatch || !endMatch) continue;

    const startTz = (startMatch[1] || "UTC").replace(/^\//, "");
    const endTz = (endMatch[1] || "UTC").replace(/^\//, "");

    const mkIso = (m: RegExpMatchArray) => {
      const [, , y, mo, d, H, M, S] = m;
      return `${y}-${mo}-${d}T${H}:${M}:${S || "00"}`;
    };

    // 1) Interprète chaque DTSTART/DTEND comme **heure locale dans son TZID**
    // 2) Convertit en UTC via fromZonedTime (v3)
    const startUtc = fromZonedTime(mkIso(startMatch), startTz); // -> Date (instant UTC)
    const endUtc = fromZonedTime(mkIso(endMatch), endTz);

    // 3) Formate en Europe/Paris (DST géré) avec formatInTimeZone
    const parisTz = "Europe/Paris";
    const startTime = formatInTimeZone(startUtc, parisTz, "HH:mm");
    const endTime = formatInTimeZone(endUtc, parisTz, "HH:mm");

    // Jour : privilégie BYDAY de la RRULE, sinon calcule depuis la date en Paris
    let dayOfWeek = "";
    let dayOrder = 0;
    const byday = rrule?.match(/BYDAY=([A-Z]{2})/)?.[1];
    if (byday && DAY_MAP[byday]) {
      dayOfWeek = DAY_MAP[byday].fr;
      dayOrder = DAY_MAP[byday].order;
    } else {
      // On dérive le libellé depuis la date formattée en Paris
      dayOfWeek = formatInTimeZone(startUtc, parisTz, "EEEE", { locale: fr }); // ex: "lundi"
      // Capitalise + map ordre
      dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
      const order = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
      dayOrder = order.indexOf(dayOfWeek) + 1;
    }

    // Si tu veux la Date "en Paris", reparse via toLocaleString n’est pas nécessaire :
    // on garde l’instant (UTC) et c’est le format qui impose Paris.
    // Pour cohérence, on expose quand même des Date objets (instant UTC).
    events.push({
      summary,
      description,
      startDate: startUtc,
      endDate: endUtc,
      dayOfWeek,
      dayOrder,
      startTime,
      endTime,
    });
  }

  return events.sort((a, b) => a.dayOrder - b.dayOrder);
};
