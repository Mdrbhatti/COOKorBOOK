import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FilterSearchResultsPipe } from './cb-food-search.pipe';
import { BackendService } from '../../services/backend.service';
import { configuration } from '../../config/config';

@Component({
  selector: 'app-cb-find-food',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cb-find-food.component.html',
  styleUrls: ['./cb-find-food.component.scss']
})
export class CbFindFoodComponent implements OnInit {
  foodItems: any = [];
  foodItemsToDisplay: any[] = [];
  filterParametersArray = {};
  serachInput = '';
  isFilterMenuClosedOnMobile = true;

  constructor(private bcService: BackendService,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit() { this.getAllPublishedItems(); }

  getLinkToItem(id) { return `/order-food/${id}`; }

  getAllPublishedItems() {
    this.bcService.getPublishedItems(null).subscribe(
      (res: any) => {
        console.log("Moderate success");
        console.log(res);
        this.foodItems = res;
        this.foodItemsToDisplay = this.foodItems.filter(item => {
          return item.servingsRemaining > 0;
        }).slice();
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

  getImageURL(url: string) {
    url = configuration.backendurl + url.substring(21);
    console.log(url);
    return url;
  }
}
