import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { ItemCategory } from './Category';
import { ItemAllergen } from './Allergen';
import { PublishInformation } from './Publish';
import { itemsMock } from './ItemMock';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { BackendService } from '../../services/backend.service';

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
  public allergens: Array<ItemAllergen> = [];
  public image: String = '';
  // publish info
  public date: string = '';
  public servings: number = 0;
  public price: number = 0.0;

  imageResizeOptions: ResizeOptions = {
    resizeMaxHeight: 256,
    resizeMaxWidth: 256
  };

  constructor(private apiService: BackendService) {
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
      tags.push({ title: { display: item.title, value: item.title } });
    }
    return tags;
  }

  tagsToItems(tags, itemClass) {
    let items = [];
    for (let tag of tags) {
      items.push({ 'title': tag.value , 'description': ''});
    }
    return items;
  }

  imageSelected(imageResult: ImageResult) {
    this.image = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  titleReused(item) {
    this._id = item.id;
    this.description = item.description;
    this.categories = this.itemsToTags(item.categories);
    this.allergens = this.itemsToTags(item.allergens);
  }

  onChange(newValue) {
    if (typeof(newValue) === 'object')
    console.log(newValue);
    return true;
  }

  registerItem() {
    // API call to create new item
    return this.apiService.createItem(this.title,
      this.description,
      this.tagsToItems(this.categories, ItemCategory),
      this.tagsToItems(this.allergens, ItemAllergen),
      this.image);
  }

  publishItem() {
    // check item form
    if (this._id == -1) {
      this.registerItem().subscribe((res: any) => {
        console.log(res)
        this._id = res._id;
      },
        (error) => {
          console.log(error);
        });
    }

  }
}
