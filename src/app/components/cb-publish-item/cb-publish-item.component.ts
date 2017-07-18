import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { BackendService } from '../../services/backend.service';
import validator from 'validator';

@Component({
  selector: 'app-cb-publish-item',
  templateUrl: './cb-publish-item.component.html',
  styleUrls: ['./cb-publish-item.component.scss']
})

export class CbPublishItemComponent implements OnInit {
  public itemsAvailable = [];
  // item variables
  private _id: number = -1;
  public title: string = '';
  public description: string = '';
  public categories = [];
  public allergens = [];
  public ingredients = [];
  public image: string = '';
  type: string = "non-vegetarian";
  // flag for disabling field
  public itemReused: boolean = false;
  // flag for successful publish
  public published: boolean = false;
  // generic errors that are displayed to user
  public errors: Array<String> = [];

  // publish info
  public date: string = '';
  public servings: number;
  public price: number;


  sellerComments; // add
  bulkPricing;
  // TODO: add in form
  addressStreet;
  addressPostalCode;
  addressCity;

  imageResizeOptions: ResizeOptions = {
    resizeMaxHeight: 256,
    resizeMaxWidth: 256
  };

  constructor(private apiService: BackendService) { }

  ngOnInit() { }

  tagsToItems(tags) {
    let items = [];
    if (tags.length === 0) {
      items.push("");
    }
    for (let tag of tags) {
      if (tag.value == "vegan" || tag.value == "vegetarian") {
        this.type = "vegetarian";
      }
      items.push(tag.value);
    }
    return items;
  }

  imageSelected(imageResult: ImageResult) {
    this.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  onChange(newValue) {
  }

  setBulk(val) {
    this.bulkPricing = val;
  }
  publishItem() {
    let params = {};
    params["description"] = this.description;
    params["name"] = this.title;
    params["categories"] = this.tagsToItems(this.categories);
    params["allergens"] = this.tagsToItems(this.allergens);
    params["ingredients"] = this.tagsToItems(this.ingredients);
    params["image"] = this.image;
    params["rating"] = 5; // todo: remove this
    params["sellerComments"] = this.sellerComments; // add
    params["bulkPricing"] = this.bulkPricing;
    params["type"] = this.type;
    params["addressStreet"] = this.addressStreet;
    params["addressPostalCode"] = this.addressPostalCode;
    params["addressCity"] = this.addressCity;
    params["servings"] = this.servings;
    params["pickupTime"] = [this.date];
    params["pricePerPortion"] = this.price;
    console.log("Params:");
    console.log(params);
    // seller  = id
    this.apiService.publishItem(params).subscribe(
      (res: any) => {
        console.log("Published item:");
        console.log(res);
      },
      (error) => { console.log("Error @ publish item"); console.log(error); }
    );
  }

  isTitleValid() {
    return validator.isLength(this.title, { min: 10, max: 255 });
  }

  isCategoriesValid() {
    return validator.isLength(this.categories, { min: 1 });
  }

  isPublishDateValid() {
    console.log(this.date);
    return this.date.length > 0;
    // return validator.isAfter(this.date) && validator.isISO8601(this.date);
  }

  isServingsValid() {
    return validator.isInt(this.servings);
  }

  isPriceValid() {
    return validator.isFloat(this.price);
  }
}
