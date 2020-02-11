export interface IMessage {
  text: string;
  response: string;
  intentName: string;
  intentId: number;
  newIntentName?: string;
  isChangeIntentMode?: boolean;
  isSelectOpen?: boolean;
  selectedValue?: string;
  newIntentId?: number;
}
export interface IMessages extends Array<IMessage>{}
