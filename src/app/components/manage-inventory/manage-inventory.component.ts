/**
 * Created by oysteinhauan on 06/07/17.
 */

import { Component, OnInit } from '@angular/core';
import { FoodItem } from './../shared/food/food';
import { fooditemsMock } from './../shared/food/food-mock';
import { FoodQuantity } from './../shared/food/food-quantity';
import {Router } from '@angular/router';


// import template from './frontpage.template.html';

@Component ({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.template.html',
  styleUrls:   ['./manage-inventory.component.scss']

})

export class ManageComponent implements OnInit{

  foodItemsToDisplay: FoodQuantity[] = [];
  foodItemsQuantity: FoodQuantity[] = [];

  constructor(private router: Router) {

    for(const fooditem of fooditemsMock){
      this.foodItemsQuantity.push(new FoodQuantity(new FoodItem( fooditem.name,
        fooditem.description,
        fooditem.sellerComments,
        fooditem.pricePerPortion,
        fooditem.bulkPricing,
        fooditem.image,
        fooditem.type,
        fooditem.rating,
        fooditem.addressStreet,
        fooditem.addressPostalCode,
        fooditem.addressCity), 10));
    }
    this.foodItemsToDisplay = this.foodItemsQuantity.slice();

  }

  save(){

  }

  cancel(){
    setTimeout(() => {this.router.navigate(['/find-food']);}, 0);
  }

  ngOnInit(){}

}

