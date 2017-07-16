import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FoodItem } from './food';
import { fooditemsMock } from './food-mock';
import { FilterSearchResultsPipe } from './cb-food-search.pipe';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-cb-find-food',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cb-find-food.component.html',
  styleUrls: ['./cb-find-food.component.scss']
})
export class CbFindFoodComponent implements OnInit {
  image = `http://drop.ndtv.com/albums/COOKS/corngallery/creolespicedcornthumb_640x480.jpg`;
  foodItems: any = [];
  // foodItems: FoodItem[] = [];
  foodItemsToDisplay: any[] = [];
  filterParametersArray = {};
  serachInput = '';
  isFilterMenuClosedOnMobile = true;

  constructor(private bcService: BackendService, private ref: ChangeDetectorRef) { 
    // this.getAllPublishedItems();
    // for (const fooditem of fooditemsMock) {
    //   this.foodItems.push(new FoodItem(fooditem.name,
    //     fooditem.description,
    //     fooditem.sellerComments,
    //     fooditem.pricePerPortion,
    //     fooditem.bulkPricing,
    //     fooditem.image,
    //     fooditem.type,
    //     fooditem.rating,
    //     fooditem.addressStreet,
    //     fooditem.addressPostalCode,
    //     fooditem.addressCity
    //   ));
    // }
    // this.foodItemsToDisplay = this.foodItems.slice();
  }

  ngOnInit() { this.getAllPublishedItems();}

  getAllPublishedItems() {
    this.bcService.getPublishedItems().subscribe(
      (res: any) => {
        console.log("Moderate success");
        console.log(res);
        for (let e of res) {
          let dict  = {};
            dict['name'] = e.item.title;
          dict['description'] = e.item.description;
          dict['sellerComments'] = "MEOWWWW"; //
          dict['pricePerPortion'] = e.price;
          dict['picture'] = this.image; //
          dict['bulkPricing'] = Math.floor((Math.random()*2)) == 1 ? true : false; //
          dict['type'] = e.item.categories[0].description;
          dict['rating'] = Math.floor((Math.random()*5)+1); //
          dict['addressStreet'] = "hilblde32";
          dict['addressPostalCode'] = "90323";
          dict['addressCity'] = "Munchen";
          this.foodItems.push(dict);
          // this.foodItems.name = e.item.title;
          // this.foodItems.description = e.item.description;
          // this.foodItems.sellerComments = "MEOWWWW"; //
          // this.foodItems.pricePerPortion = e.price;
          // this.foodItems.image = this.image; //
          // this.foodItems.bulkPricing = Math.floor((Math.random()*2)) == 1 ? true : false; //
          // this.foodItems.type = e.item.categories.title;
          // this.foodItems.rating = Math.floor((Math.random()*5)+1); //
          // this.foodItems.addressStreet = "hilblde32";
          // this.foodItems.addressPostalCode = "90323";
          // this.foodItems.addressCity = "Munchen";
        }
        console.log(this.foodItems);
        this.foodItemsToDisplay = this.foodItems.slice();
        console.log(this.foodItemsToDisplay);
        this.ref.detectChanges();
      },
      (error) => { console.log(error); }
    );
  }

  search() {
    if (this.serachInput === '') {
      return this.foodItemsToDisplay = this.foodItems;
    } else {
      this.foodItemsToDisplay = this.foodItems.slice().filter((el) =>
        el.name.toLowerCase().indexOf(this.serachInput.toLowerCase()) > -1
      )
    }
  }

  createRangeArray(x: number) {
    return Array(x).fill(x);
  }

  updateFilter(f: any) {
    for (const key in f) {
      if (this.filterParametersArray[key] !== undefined) {  // not first filter of category
        this.filterParametersArray[key].push(f[key]);
      } else if (this.filterParametersArray[key] === undefined) { // first category filter
        this.filterParametersArray[key] = [];
        this.filterParametersArray[key].push(f[key]);
      }
    }
    console.log(this.filterParametersArray);
  }

  removeFilterParameter(r: any) {
    let key;
    let value;
    for (const i in r) {  // simples hack i could think for getting key/value
      key = i;
      value = r[i];
    }
    if (this.filterParametersArray[key] !== undefined) { // if the key exists
      const indexOfValueToDelete = this.filterParametersArray[key].indexOf(value);
      if (indexOfValueToDelete > -1) {
        this.filterParametersArray[key].splice(indexOfValueToDelete, 1);
      }
      if (this.filterParametersArray[key].length === 0) {
        delete this.filterParametersArray[key];
      }
    }
    console.log(this.filterParametersArray);
  }

  updatePriceFilter(e: any, range: string) {  // simple filter for now
    const rangeArray = range.split(',');
    if (e.target.checked) {
      for (let i = 0; i < rangeArray.length; i++) {
        this.updateFilter({ pricePerPortion: Number(rangeArray[i]) });
      }
    } else {
      for (let i = 0; i < rangeArray.length; i++) {
        this.removeFilterParameter({ pricePerPortion: Number(rangeArray[i]) });
      }
    }
  }
}
