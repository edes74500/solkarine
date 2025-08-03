import { ConversationApi } from "@repo/types";
export class MessagerieUtils {
  static isUserCreator(conversation: Partial<ConversationApi>, userId: string) {
    return conversation.creatorId === userId;
  }

  static isUserInterested(conversation: Partial<ConversationApi>, userId: string) {
    return conversation.interestedId === userId;
  }

  static getConversationPartenerId(conversation: Partial<ConversationApi>, userId: string) {
    return conversation.creatorId === userId ? conversation.interestedId : conversation.creatorId;
  }
}
