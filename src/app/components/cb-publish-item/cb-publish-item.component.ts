import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  public itemForm: FormGroup;
  public publishForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.itemsAvailable = itemsMock;
  }

  ngOnInit() {
    this.itemForm = this.builder.group({
      _id: [-1],
      title: ['', Validators.required],
      description: [''],
      categories: [[], Validators.required],
      ingredients: [[], Validators.required],
      allergens: [[]]
    });
    this.publishForm = this.builder.group({
      date: ['', Validators.required],
      servings: [0, Validators.required],
      price: [0.0, Validators.required]
    });
  }

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
    this.itemForm.patchValue({
        _id: item.id,
        description: item.description,
        categories: this.itemsToTags(item.categories),
        ingredients: this.itemsToTags(item.ingredients),
        allergens: this.itemsToTags(item.allergens)
      });
  }

  registerItem() {
    console.log(`Registering item, id: ${this.itemsAvailable.length}`);
    // set dummy id
    let item = new Item(this.itemsAvailable.length);
    this.itemForm.controls['_id'].setValue(item.id);
    let controls = this.itemForm.controls;

    item.title = controls['title'].value;
    item.description = controls['description'].value;
    item.categories = this.tagsToItems(controls['categories'], ItemCategory);
    item.allergens = this.tagsToItems(controls['allergens'], ItemAllergen);
    item.ingredients = this.tagsToItems(controls['ingredients'], ItemIngredient);
    this.itemsAvailable.push(item);
    return item;
  }

  publishItem() {
    // check item form
    if (this.itemForm.controls['_id'].value == -1) {
      this.registerItem();
    }
    // published info accessable via:
    // this.publishForm.controls
  }
}
