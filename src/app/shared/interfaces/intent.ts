export interface IIntent {
  name: string;
  examples: [];
  responses: [];
  description: string;
  id: number;
}
export interface IIntents extends Array<IIntent>{}
