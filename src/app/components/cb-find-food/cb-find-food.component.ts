import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FoodItem } from './food';
import { fooditemsMock } from './food-mock';
import { FilterSearchResultsPipe } from './cb-food-search.pipe';

@Component({
  selector: 'app-cb-find-food',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cb-find-food.component.html',
  styleUrls: ['./cb-find-food.component.scss']
})
export class CbFindFoodComponent implements OnInit {
  foodItems: FoodItem[] = [];
  foodItemsToDisplay: FoodItem[] = [];
  filterParametersArray = {};
  serachInput = '';

  constructor() {

    for (const fooditem of fooditemsMock) {
      this.foodItems.push(new FoodItem( fooditem.name,
                                        fooditem.description,
                                        fooditem.sellerComments,
                                        fooditem.pricePerPortion,
                                        fooditem.bulkPricing,
                                        fooditem.image,
                                        fooditem.type,
                                        fooditem.rating,
                                        fooditem.addressStreet,
                                        fooditem.addressPostalCode,
                                        fooditem.addressCity
                                      ));
    }
    this.foodItemsToDisplay = this.foodItems.slice();
  }

  ngOnInit() { }

  search() {
    if (this.serachInput === '') {
      return this.foodItemsToDisplay = this.foodItems;
    } else {
      this.foodItemsToDisplay = this.foodItems.slice().filter((el) =>
        el.name.toLowerCase().indexOf(this.serachInput.toLowerCase()) > -1
      )
    }
  }

  createRangeArray(x: number) {
    return Array(x).fill(x);
  }

  updateFilter(f: any) {
    for ( const key in f) {
      if (this.filterParametersArray[key] !== undefined) {  // not first filter of category
        this.filterParametersArray[key].push(f[key]);
      } else if (this.filterParametersArray[key] === undefined) { // first category filter
        this.filterParametersArray[key] = [];
        this.filterParametersArray[key].push(f[key]);
      }
    }
    console.log(this.filterParametersArray);
  }

  removeFilterParameter(r: any) {
    let key;
    let value;
    for (const i in r) {  // simples hack i could think for getting key/value
      key = i;
      value = r[i];
    }
    if (this.filterParametersArray[key] !== undefined ) { // if the key exists
      const indexOfValueToDelete = this.filterParametersArray[key].indexOf(value);
      if (indexOfValueToDelete > -1) {
        this.filterParametersArray[key].splice(indexOfValueToDelete, 1);
      }
      if (this.filterParametersArray[key].length === 0) {
        delete this.filterParametersArray[key];
      }
    }
    console.log(this.filterParametersArray);
  }

  updatePriceFilter(e: any, range: string) {  // simple filter for now
    const rangeArray = range.split(',');
    if (e.target.checked) {
      for (let i = 0; i < rangeArray.length; i++ ) {
        this.updateFilter({pricePerPortion : Number(rangeArray[i])});
      }
    } else {
      for (let i = 0; i < rangeArray.length; i++ ) {
        this.removeFilterParameter({pricePerPortion : Number(rangeArray[i])});
      }
    }
  }
}
