/**
 * Created by oysteinhauan on 07/07/17.
 */

import {FoodItem} from "./food";

export class FoodQuantity {
  
  fooditem: FoodItem;
  quantity: number;
  
  constructor(fooditem: FoodItem, quantity: number){
    this.fooditem = fooditem;
    this.quantity = quantity;
  }
  
  
}
