/**
 * Created by oysteinhauan on 07/07/17.
 */

export class FoodQuantity {

  title: string;
  itemId: string;
  price: number;
  quantity: number;
  currently: number;
  quantityList: Array<number>;

  constructor(itemId: string, title: string, price: number, quantity: number, ){
    this.title = title;
    this.itemId = itemId;
    this.price = price;
    this.quantity = quantity;
    this.quantityList = Array.from(Array(50), (x, i) => i);
  }
}
