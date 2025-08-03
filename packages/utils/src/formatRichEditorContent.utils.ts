import { parse } from "node-html-parser";

export const formatRichEditorContent = (html: string): string => {
  const root = parse(html);

  const processNode = (node: any): string => {
    if (node.nodeType === 3) {
      // Text node
      return node.text.trim();
    }

    if (node.tagName === "P") {
      const content = node.childNodes.map(processNode).join("").trim();
      return content ? content + "\n\n" : "\n"; // Deux sauts de ligne après chaque paragraphe
    }

    if (node.tagName === "BR") {
      return "\n\n"; // Deux sauts de ligne pour chaque <br>
    }

    if (node.tagName === "LI") {
      const content = node.childNodes
        .filter((child: any) => child.tagName !== "SPAN")
        .map(processNode)
        .join("")
        .trim();
      return `     ➡️ ${content}\n\n`; // Indentation supplémentaire pour les éléments de liste
    }

    if (node.tagName === "UL") {
      return "\n\n" + node.childNodes.map(processNode).join("") + "\n\n"; // Plus d'espacement avant et après la liste
    }

    if (node.tagName === "OL") {
      // Pour les listes ordonnées
      let index = 1;
      let result = "\n\n";

      for (const child of node.childNodes) {
        if (child.tagName === "LI") {
          const content = child.childNodes
            .filter((c: any) => c.tagName !== "SPAN")
            .map(processNode)
            .join("")
            .trim();
          result += `  ✅ ${content}\n\n`; // Indentation supplémentaire pour les éléments de liste ordonnée
          index++;
        } else {
          result += processNode(child);
        }
      }

      return result + "\n";
    }

    return node.childNodes.map(processNode).join("");
  };

  // Préserver les émojis dans le texte formaté
  const formattedText = processNode(root)
    .replace(/\n{3,}/g, "\n\n") // Remplace les sauts de ligne multiples par deux maximum
    .trim();

  return formattedText;
};

// import { parse } from "node-html-parser";

// export const formatRichEditorContent = (html: string): string => {
//   const root = parse(html);

//   const processNode = (node: any): string => {
//     if (node.nodeType === 3) {
//       // Text node
//       return node.text.trim();
//     }

//     if (node.tagName === "P") {
//       const content = node.childNodes.map(processNode).join("").trim();
//       return content ? content + "\n\n" : "\n"; // Deux sauts de ligne après chaque paragraphe
//     }

//     if (node.tagName === "BR") {
//       return "\n\n"; // Deux sauts de ligne pour chaque <br>
//     }

//     if (node.tagName === "LI") {
//       const content = node.childNodes
//         .filter((child: any) => child.tagName !== "SPAN")
//         .map(processNode)
//         .join("")
//         .trim();
//       return `      ✅ ${content}\n`; // Un saut de ligne après chaque élément de liste
//     }

//     if (node.tagName === "OL" || node.tagName === "UL") {
//       return node.childNodes.map(processNode).join("") + "\n"; // Un saut de ligne supplémentaire après la liste
//     }

//     return node.childNodes.map(processNode).join("");
//   };

//   const formattedText = processNode(root)
//     .replace(/\n{3,}/g, "\n\n") // Remplace les sauts de ligne multiples par deux maximum
//     .trim();

//   return formattedText;
// };
