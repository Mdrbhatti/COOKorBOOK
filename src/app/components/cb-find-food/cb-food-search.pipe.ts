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
        console.log(filterParameter);
        if (foodItem[filterParameter] === undefined ) {
          return false;
        }
        if ( filterParameter === 'pricePerPortion') {
          const priceLimits = filterParameters[filterParameter].split(',');
          if ( foodItem[filterParameter] <= priceLimits[0] || foodItem[filterParameter] > priceLimits[1]) {
            return false;
          }
        } else {
          if (foodItem[filterParameter] !== filterParameters[filterParameter]) {
            return false;
          }
        }
      }
      return true;
    })
  }
}

