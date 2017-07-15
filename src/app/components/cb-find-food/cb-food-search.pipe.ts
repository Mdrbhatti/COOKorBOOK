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
        let nop = 0;
        console.log('[' + foodItem.name + ']' + ' -- in FOR for: ' + filterParameter + ' --- ' + ++nop);
        // console.log(filterParameters);
        if (foodItem[filterParameter] === undefined ) {
          console.log('undefined attribute in food Item');
          return false;
        }
        // if ( filterParameter === 'pricePerPortion') {
        //   // const priceLimits = filterParameters[filterParameter].split(',');
        //   // if ( foodItem[filterParameter] <= priceLimits[0] || foodItem[filterParameter] > priceLimits[1]) {
        //   //   return false;
        //   // }
        // } else {
          const filterConditionValuesObject = filterParameters[filterParameter];
          const filterConditionValuesArray = Object.keys(filterConditionValuesObject).map(key => filterConditionValuesObject[key]);
          console.log((foodItem[filterParameter]));
          console.log(filterConditionValuesArray);
          console.log(typeof filterConditionValuesArray);
          if (filterConditionValuesArray.indexOf(foodItem[filterParameter]) === -1 ) {
            return false;
          }
        // }
      }
      return true;
    })
  }
}

