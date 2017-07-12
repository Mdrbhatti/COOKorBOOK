import { Component, OnInit } from '@angular/core';
import { FoodItem } from './../shared/food/food';
import { fooditemsMock } from './../shared/food/food-mock';

@Component({
  selector: 'app-cb-find-food',
  templateUrl: './cb-find-food.component.html',
  styleUrls: ['./cb-find-food.component.scss']
})
export class CbFindFoodComponent implements OnInit {
  foodItems: FoodItem[] = [];
  foodItemsToDisplay: FoodItem[] = [];
  serachInput: string;

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
    this.foodItemsToDisplay = this.foodItems.slice().filter((el) =>
      el.name.toLowerCase().indexOf(this.serachInput.toLowerCase()) > -1
    )
  }

  createRangeArray(x: number) {
    return Array(x).fill(x);
  }
}
