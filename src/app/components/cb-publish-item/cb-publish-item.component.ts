import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { ItemCategory } from './Category';
import { ItemIngredient } from './Ingredient';
import { ItemAllergen } from './Allergen';
import { PublishInformation } from './Publish';
import { itemsMock } from './ItemMock';


@Component({
  selector: 'app-cb-publish-item',
  templateUrl: './cb-publish-item.component.html',
  styleUrls: ['./cb-publish-item.component.scss']
})

export class CbPublishItemComponent implements OnInit {
  public itemsAvailable: Array<Item> = [];
  // item variables
  private _id: number = -1;
  public title: string = '';
  public description: string = '';
  public categories: Array<ItemCategory> = [];
  public ingredients: Array<ItemIngredient> = [];
  public allergens: Array<ItemAllergen> = [];

  // publish info
  public date: string = '';
  public servings: number = 0;
  public price: number = 0.0;

  constructor() {
    this.itemsAvailable = itemsMock;
  }

  ngOnInit() { }

  autocompleteFormatter(item: any): string {
    let generateTagsHtml = (list, tag) => {
      let html = '';
      for (let item of list) {
        html += `<span class="tag ${ tag }">${ item.title }</span>`;
      }
      return html
    };
    let html = `<div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img src="${ item.image_url}" alt="Image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">${ item.title}</p>
                        <p class="subtitle is-6">${ generateTagsHtml(item.categories, 'is-success')}</p>
                        <p class="subtitle is-6">${ generateTagsHtml(item.ingredients, 'is-warning')}</p>
                        <p class="subtitle is-6">${ generateTagsHtml(item.allergens, 'is-danger')}</p>
                      </div>
                    </div>

                    <div class="content">
                      ${ item.description}
                    </div>
                  </div>
                </div>`;
    // let html = `<span>${data.title}</span>`;
    return html;
  }

  itemsToTags(items) {
    let tags = [];
    for (let item of items) {
      tags.push(item.title);
    }
    return tags;
  }

  tagsToItems(tags, itemClass) {
    let items = [];
    for (let tag of tags) {
      var item = new itemClass();
      item.title = tag;
      items.push(item);
    }
    return items;
  }

  titleReused(item) {
    this._id = item.id;
    this.description = item.description;
    this.categories = this.itemsToTags(item.categories);
    this.ingredients = this.itemsToTags(item.ingredients);
    this.allergens = this.itemsToTags(item.allergens);
  }

  registerItem() {
    console.log(`Registering item, id: ${this.itemsAvailable.length}`);
    // set dummy id
    let item = new Item(this.itemsAvailable.length);
    this._id = item.id;

    item.title = this.title;
    item.description = this.description;
    item.categories = this.tagsToItems(this.categories, ItemCategory);
    item.allergens = this.tagsToItems(this.allergens, ItemAllergen);
    item.ingredients = this.tagsToItems(this.ingredients, ItemIngredient);
    this.itemsAvailable.push(item);
    return item;
  }

  publishItem() {
    // check item form
    if (this._id == -1) {
      this.registerItem();
    }
    // published info accessable via:
    // this.publishForm.controls
  }
}
