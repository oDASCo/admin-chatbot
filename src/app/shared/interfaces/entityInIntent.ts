export interface IEntityInIntent {
  entityExamples?: [];
  selectedValue?: string;
  oldWord?: string;
  isSelectOpen?: boolean;
  entityName?: string;
}
export interface IEntitiesInIntent extends Array<IEntityInIntent> {
}
