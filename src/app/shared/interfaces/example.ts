export interface IExample {
  example: any;
  editMode: boolean;
  entities?: any;
  searchEntities?: any;
  isEntitiesOpen?: boolean;
}

export interface IExamples extends Array<IExample> {
}
