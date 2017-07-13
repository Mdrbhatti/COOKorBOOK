/**
 * Created by oysteinhauan on 07/07/17.
 */

import {FoodItem} from "./food";

export class FoodQuantity {

  fooditem: FoodItem;
  quantity: number;
  quantityList: Array<number>;

  constructor(fooditem: FoodItem, quantity: number){
    this.fooditem = fooditem;
    this.quantity = quantity;
    this.quantityList = Array.from(Array(quantity), (x, i) => i);
  }


}
