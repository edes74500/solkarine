import sanitizeHtml from "sanitize-html";

export class SharedUtils {
  static async sanitizeMessageContent(content: string) {
    return sanitizeHtml(content, {
      allowedTags: ["b", "i", "em", "strong", "p", "br"], // liste blanche de tags autorisés
      allowedAttributes: {},
    });
  }
}
