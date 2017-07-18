/**
 * Created by oysteinhauan on 06/07/17.
 */

import { Component, OnInit } from '@angular/core';
import { FoodQuantity } from './food-quantity';
import {Router } from '@angular/router';
import { ManageService } from '../../services/manage.service';
import {forEach} from "@angular/router/src/utils/collection";


// import template from './frontpage.template.html';

@Component ({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.template.html',
  styleUrls:   ['./manage-inventory.component.scss']

})

export class ManageComponent implements OnInit {
  items: any[]
  foodItemsToDisplay: FoodQuantity[] = [];
  foodItemsQuantity: FoodQuantity[] = [];

  constructor(private router: Router, private manageService: ManageService) {

    this.manageService.getInventory().subscribe(
      (res: any[]) => {
        this.items = res;
        console.log("Published items");
        console.log(this.items);
      },
      (error) => { console.log(error); }

    );

  }

  save(){
    console.log(this.items);
    this.items.forEach(item => this.manageService.updateInventory(item._id, item.pricePerPortion, item.servings).subscribe(
    ))
    setTimeout(() => {this.router.navigate(['/find-food']); }, 2000);
  }

  cancel(){
    setTimeout(() => {this.router.navigate(['/find-food']); }, 0);
  }

  cancelOrders(){

  }

  ngOnInit(){}

}

