export interface IConversation {
  conversationDate: string;
  lowestConfidenceLevel: string;
  sessionId: string;
}
export interface IConversatios extends Array<IConversation>{}
