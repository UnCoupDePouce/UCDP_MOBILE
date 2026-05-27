import { getAuthHeaders, request } from "./api.engine";

export interface Conversation {
  contact_id: string;
  nom: string;
  prenom: string;
  last_message: string;
}

export interface MessageItem {
  id_message: number;
  corps: string;
  id_expediteur: string;
  id_destinataire: string;
  lu: boolean;
  created_at?: string;
}

export const MessageService = {
  getConversations: (): Promise<Conversation[]> => {
    return request<Conversation[]>("GET", "/messages/conversations", {
      headers: getAuthHeaders(),
    });
  },

  getConversation: (contactId: string): Promise<MessageItem[]> => {
    return request<MessageItem[]>(
      "GET",
      `/messages/conversation/${contactId}`,
      {
        headers: getAuthHeaders(),
      },
    );
  },
};
