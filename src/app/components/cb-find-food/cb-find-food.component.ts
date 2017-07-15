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
      if (this.filterParametersArray[key] !== undefined) {
        delete this.filterParametersArray[key];
      }
      this.filterParametersArray[key] = f[key];
    }
  }

  removeFilterParameter(r: any) {
    let key;
    let value;
    for (const i in r) {  // simples hack i could think for getting key/value
      key = i;
      value = r[i];
    }
    if (this.filterParametersArray[key] !== undefined ) {
      delete this.filterParametersArray[key];
    }
  }
}
