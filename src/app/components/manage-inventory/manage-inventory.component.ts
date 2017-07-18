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

  foodItemsToDisplay: FoodQuantity[] = [];
  foodItemsQuantity: FoodQuantity[] = [];
  random: any[];

  constructor(private router: Router, private manageService: ManageService) {

    this.manageService.getInventory().subscribe(
      (res: any[]) => {
        this.random = res;
        console.log(this.random);
        res.forEach(test => this.foodItemsToDisplay.push(new FoodQuantity(test.item._id, test.item.title, test.price, test.servings)))
      },
      (error) => { console.log(error); }

    );

  }

  save(){
    this.foodItemsToDisplay.forEach(item => this.manageService.updateInventory(item.itemId, item.price, item.quantity).subscribe(

    ))
  }

  cancel(){
    setTimeout(() => {this.router.navigate(['/find-food']); }, 0);
  }

  cancelOrders(){

  }

  ngOnInit(){}

}

