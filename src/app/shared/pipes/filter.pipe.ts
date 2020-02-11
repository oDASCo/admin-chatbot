import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(itemsList, searchStr: string) {
    if (!itemsList.length || !searchStr) {
      return itemsList;
    }
    return itemsList.filter((item) => item.name.toLowerCase().indexOf(searchStr.trim().toLowerCase()) !== -1);
  }
}
