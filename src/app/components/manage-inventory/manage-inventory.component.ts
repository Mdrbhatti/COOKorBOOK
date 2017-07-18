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
  items: any[];
  errors: any[];
  foodItemsToDisplay: FoodQuantity[] = [];
  foodItemsQuantity: FoodQuantity[] = [];
  saveStatus = '';
  deleteStatus = '';

  constructor(private router: Router, private manageService: ManageService) {

    this.manageService.getInventory(localStorage.getItem('id')).subscribe(
      (res: any[]) => {
        this.items = res;
        console.log("Published items");
        console.log(this.items);
      },
      (error) => { console.log(error); }

    );

  }

  save() {
    let succesfulSaves = 0;
    console.log(this.items.length);
    this.items.forEach(item => this.manageService.updateInventory(item._id, item.pricePerPortion, item.servings).subscribe(
      (res: any) => {
        succesfulSaves ++;
        console.log(succesfulSaves);
        if (succesfulSaves === this.items.length) {
          this.saveStatus = 'success'
          this.manageService.getInventory(localStorage.getItem('id')).subscribe(
            (result: any[]) => {
              this.items = result;
            },
            (error) => { console.log(error); }

          );
        }
      },
      (error) => { console.log(error); this.saveStatus = 'fail' }
    ));
  }

  cancel(){
    setTimeout(() => {this.router.navigate(['/find-food']); }, 0);
  }

  cancelOrder(itemId) {
    console.log(itemId);
    this.manageService.dropMeal(itemId).subscribe(
      (res: any) => {
          this.deleteStatus = 'success'
          this.manageService.getInventory(localStorage.getItem('id')).subscribe(
            (result: any[]) => {
              this.items = result;
            },
            (error) => {
              console.log(error);
            this.deleteStatus = 'fail';}

          );
      }
    );
  }

  ngOnInit(){}

}

