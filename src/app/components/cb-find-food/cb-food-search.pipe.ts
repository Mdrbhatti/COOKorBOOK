import { Pipe, PipeTransform } from '@angular/core';
/*
 * Filter the search results dynamically
*/
@Pipe({name: 'filterFood', pure: false})
export class FilterSearchResultsPipe implements PipeTransform {
  transform(foodItems: any, filterParameters?: any[]): any[] {
    console.log(foodItems);
    console.log(filterParameters);
    return foodItems = foodItems.filter(foodItem => {
      for (const filterParameter in filterParameters) {
        if (foodItem[filterParameter] === undefined || foodItem[filterParameter] !== filterParameters[filterParameter]) {
          return false;
        }
      }
      return true;
    })
  }
}

