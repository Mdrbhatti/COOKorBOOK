/**
 * Created by oysteinhauan on 06/07/17.
 */

import { Component, OnInit } from '@angular/core';
import { FoodQuantity } from './food-quantity';
import {Router } from '@angular/router';
import { ManageService } from '../../services/manage.service';


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
        this.items.forEach(
          item => this.manageService.getOrdersForItem(item._id).subscribe((response: any[]) => {
            item.orders = response;
          })
        );
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
          setTimeout(() => {this.saveStatus = ''; }, 4000);
        }
      },
      (error) => { console.log(error); this.saveStatus = 'fail'
        setTimeout(() => {this.saveStatus = ''; }, 4000);

      }
    ));
  }

  cancel(){
    setTimeout(() => {this.router.navigate(['/find-food']); }, 0);
  }

  cancelMeal(itemId) {
    console.log(itemId);
    this.manageService.dropMeal(itemId).subscribe(
      (res: any) => {
          this.deleteStatus = 'success';
        setTimeout(() => {this.deleteStatus = ''; }, 4000);
        // remove deleted item
        const items = this.items.filter(item => item._id !== itemId);
        this.items = items;

        // this.manageService.getInventory(localStorage.getItem('id')).subscribe(
        //     (result: any[]) => {
        //       this.items = result;
        //     },
        //     (error) => {
        //       console.log(error);
        //     this.deleteStatus = 'fail';
        //       setTimeout(() => {this.deleteStatus = ''; }, 4000);
        //
        //     }
        //
        //   );
      }, (error) => {
        this.deleteStatus = 'fail';
        setTimeout(() => {this.deleteStatus = ''; }, 4000);
      }
    );
  }

  cancelOrder(itemId, orderId) {
    this.manageService.dropOrder(orderId).subscribe(
      (res: any) => {
        this.deleteStatus = 'success';
        setTimeout(() => {this.deleteStatus = ''; }, 4000);
        // remove order item
        this.items.map(item => {
          const orders = item.orders.filter(order => orderId !== order._id)
          item.orders = orders;
        })
      }, (error) => {
        console.log(error);
        this.deleteStatus = 'fail';
        setTimeout(() => {this.deleteStatus = ''; }, 4000);

      }
    )
  }

  ngOnInit(){}

}

