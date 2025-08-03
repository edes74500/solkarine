import {
  ANNOUNCES_ACCUEIL_LIST,
  ANNOUNCES_AGES_LIST,
  ANNOUNCES_CONTRATS_LIST,
  ANNOUNCES_DIPLOMES_LIST,
  ANNOUNCES_POSTE_LIST,
  ANNOUNCES_SALARY_FREQUENCIES_LIST,
} from "@repo/constants";

import { formatRichEditorContent } from "./formatRichEditorContent.utils";

export type DisplayOptions = {
  title?: boolean;
  header?: boolean;
  link?: boolean;
  location?: boolean;
  salaire?: boolean;
  dates?: boolean;
  postes?: boolean;
  diplomes?: boolean;
  accueil?: boolean;
  age?: boolean;
  employer?: boolean;
  contact?: boolean;
  content?: boolean;
};

export const formatAnnonceSalary = (salary: string, frequency: number, typeContrat: string) => {
  const frequencyText = ANNOUNCES_SALARY_FREQUENCIES_LIST[frequency];
  const contratText = ANNOUNCES_CONTRATS_LIST[Number(typeContrat)];
  return `${salary}€ ${frequencyText} (${contratText})`;
};

export const formatAnnonceDates = (from: Date, to: Date | null) => {
  const fromDate = new Date(from).toLocaleDateString("fr-FR");
  if (to) {
    const toDate = new Date(to).toLocaleDateString("fr-FR");
    return `Du ${fromDate} au ${toDate}`;
  }
  return `À partir du ${fromDate}`;
};
export const formatAnnonceLocation = (location: any) => {
  return location.map((loc: any) => (loc.city ? `${loc.city} (${loc.zipCode})` : loc.country)).join(", ");
};

export const createFacebookText = (
  announce: any,
  displayOptions: DisplayOptions = {
    title: true,
    header: true,
    link: true,
    location: true,
    salaire: true,
    dates: true,
    postes: true,
    diplomes: true,
    accueil: true,
    age: true,
    employer: true,
    contact: true,
    content: true,
  },
): string => {
  // const formatSalary = (salary: string, frequency: number, typeContrat: string) => {
  //   const frequencyText =
  //     ANNOUNCES_SALARY_FREQUENCIES_LIST[frequency as keyof typeof ANNOUNCES_SALARY_FREQUENCIES_LIST];
  //   const contratText = ANNOUNCES_CONTRATS_LIST[typeContrat as unknown as keyof typeof ANNOUNCES_CONTRATS_LIST];
  //   return `${salary}€ ${frequencyText} (${contratText})`;
  // };

  // const formatDates = (from: Date, to: Date | null) => {
  //   const fromDate = new Date(from).toLocaleDateString("fr-FR");
  //   if (to) {
  //     const toDate = new Date(to).toLocaleDateString("fr-FR");
  //     return `Du ${fromDate} au ${toDate}`;
  //   }
  //   return `À partir du ${fromDate}`;
  // };

  const plainTextContent = formatRichEditorContent(announce.content);

  let formattedMessage = "";

  if (displayOptions.header) {
    formattedMessage += ` OFFRE D'EMPLOI \n\n`;
  }

  if (displayOptions.title) {
    formattedMessage += `⭐  ${announce.title} \n\n `;
  }

  if (displayOptions.location) {
    formattedMessage += `📍 Lieu : ${announce.location.map((loc: any) => (loc.city ? `${loc.city} (${loc.zipCode})` : loc.country)).join(", ")}\n\n`;
  }

  if (displayOptions.accueil) {
    formattedMessage += `🏫 Type d'accueil : ${announce.accueil.map((id: any) => ANNOUNCES_ACCUEIL_LIST[Number(id)]).join(", ")}\n\n`;
  }

  if (displayOptions.age) {
    formattedMessage += `👦👧 Public : ${announce.age.map((id: any) => ANNOUNCES_AGES_LIST[Number(id)]).join(", ")}\n\n`;
  }

  if (displayOptions.salaire) {
    formattedMessage += `💰 Salaire : ${formatAnnonceSalary(announce.salary, Number(announce.salaryFrequency), announce.typeContrat)}\n\n`;
  }

  if (displayOptions.dates) {
    formattedMessage += `📅 Dates : ${formatAnnonceDates(announce.from, announce.to)}\n\n`;
  }

  if (displayOptions.postes) {
    formattedMessage += `🎯 Postes : ${announce.poste.map((id: any) => ANNOUNCES_POSTE_LIST[Number(id)]).join(", ")}\n\n`;
  }

  if (displayOptions.diplomes) {
    formattedMessage += `📄 Diplômes requis : ${announce.diplomes.map((id: any) => ANNOUNCES_DIPLOMES_LIST[Number(id)]).join(", ")}\n\n`;
  }

  if (displayOptions.employer) {
    formattedMessage += `🧑‍💼 Employeur : ${announce.employer_name}\n\n`;
  }

  if (displayOptions.contact) {
    formattedMessage += `📧 Contact : ${announce.contact.email || ""} ${announce.contact.phone || ""}\n\n`;
  }

  if (displayOptions.content) {
    formattedMessage += `📄 Description : \n\n${plainTextContent}\n\n`;
  }

  if (displayOptions.link) {
    formattedMessage += `🔗 Lien: https://www.nextanim.fr/annonces/${announce.id}`;
  }

  return formattedMessage;
};
