import { Component, OnInit } from '@angular/core';
import { FoodItem } from './food'

@Component({
  selector: 'app-cb-find-food',
  templateUrl: './cb-find-food.component.html',
  styleUrls: ['./cb-find-food.component.scss']
})
export class CbFindFoodComponent implements OnInit {
  foodItems: FoodItem[] = [];

  constructor() {
    this.foodItems.push(new FoodItem('Speghaetti', 50, 'http://drop.ndtv.com/albums/COOKS/corngallery/creolespicedcornthumb_640x480.jpg'));
    this.foodItems.push(new FoodItem('Cheesy Homemade Lasagna.', 40, 'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg'));
    this.foodItems.push(new FoodItem('Parmesan Cheese Pasta', 35, 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/4/1/RX-FNM_030111-Lighten-Up-012_s4x3.jpg.rend.hgtvcom.616.462.jpeg'));

  }

  ngOnInit() {
  }

}
