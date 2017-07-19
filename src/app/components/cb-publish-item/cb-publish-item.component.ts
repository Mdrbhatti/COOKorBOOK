import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { BackendService } from '../../services/backend.service';
import { Validator } from "validator.ts/Validator";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  public date: string = "";
  public servings: number;
  public price: number;
  public validator = new Validator();

  sellerComments = ""; // add
  bulkPricing = "";
  // TODO: add in form
  addressStreet = "";
  addressPostalCode = "";
  addressCity = "";

  constructor(private apiService: BackendService, private router: Router) { }

  ngOnInit() { }

  public validators = [this.endsWith$];

  public errorMessages = {
    'MinLength': 'Your items need to be at 3 least char or longer'
  };
  private endsWith$(control: FormControl) {
    console.log("Inside validator");
    if (control.value.length < 3) {
      return {
        'MinLength': true
      };
    }
    console.log("null");

    return null;
  }

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

  setBulk(val) {
    this.bulkPricing = val;
  }
  publishItem() {
    if (this.isFormValid()) {
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
      this.apiService.publishItem(params).subscribe(
        (res: any) => {
          console.log("Published item:");
          console.log(res);
          this.published = true;

          setTimeout(() => { this.router.navigate(['/find-food']); }, 2000);
        },
        (error) => {
          console.log("Error @ publish item"); console.log(error);
          this.errors.push("Please fill all form fields");
        }
      );
    }
  }
  isPublished(){
    return this.published;
  }

  showBox(){
    return !(this.published || this.isFormValid());
  }

  isFormValid() {
    if (!this.servings || !this.price || !this.date){
      return false;
    }
    let isValid = this.areTagsValid(this.categories)
      && this.areTagsValid(this.allergens)
      && this.areTagsValid(this.ingredients)
      && this.validator.isLength(this.title, 1, 255)
      && this.validator.isLength(this.description, 1, 255)
      && this.validator.isISO8601(this.date.toString())
      && this.validator.isInt(this.servings.toString(), { min: 1 })
      && this.validator.isFloat(this.price.toString(), { min: 0.1 })
      && this.validator.isLength(this.sellerComments, 1, 255)
      && this.validator.isLength(this.addressStreet, 1, 255)
      && this.validator.isLength(this.addressPostalCode, 1, 255)
      && this.validator.isLength(this.image, 1)
      && this.validator.isBoolean(this.bulkPricing)
      && this.validator.isLength(this.addressCity, 1, 255);
    return isValid;
  }

  areTagsValid(vars) {
    return vars.length > 0;
  }

}
