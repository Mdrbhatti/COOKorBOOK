import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { BackendService } from '../../services/backend.service';

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
  public allergens= [];
  public image: string = '';
  // flag for disabling field
  public itemReused: boolean = false;

  // publish info
  public date: string = '';
  public servings: number;
  public price: number;

  imageResizeOptions: ResizeOptions = {
    resizeMaxHeight: 256,
    resizeMaxWidth: 256
  };

  constructor(private apiService: BackendService) {
    this.apiService.getItems({}).subscribe((res: any) => {
        // console.log(res);
        this.itemsAvailable = res;
      },
        (error) => {
          console.log(error);
      });
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
    console.log(item);
    let html = `<div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img src="file://${ item.image.path }" alt="Image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">${ item.title}</p>
                        <p class="subtitle is-6">${ generateTagsHtml(item.categories, 'is-success')}</p>
                        <p class="subtitle is-6">${ generateTagsHtml(item.allergens, 'is-danger')}</p>
                      </div>
                    </div>

                    <div class="content">
                      ${ item.description }
                    </div>
                  </div>
                </div>`;
    // let html = `<span>${data.title}</span>`;
    return html;
  }

  itemsToTags(items) {
    let tags = [];
    for (let item of items) {
      tags.push({ display: item.title, value: item.title });
    }
    return tags;
  }

  tagsToItems(tags) {
    let items = [];
    console.log(tags);
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

  onChange(newValue) {
    if (typeof (newValue) === 'object') {
      // item selected, set values
      this._id = newValue.id;
      this.description = newValue.description;
      this.categories = this.itemsToTags(newValue.categories);
      this.allergens = this.itemsToTags(newValue.allergens);
      // make all item fields readonly, except title
      this.itemReused = true;
      console.log(this.itemReused);
    } else if (typeof (newValue) === 'string') {
      // unmake readonly
      this.itemReused = false;

      this.apiService.getItems({ title: newValue }).subscribe((res: any) => {
        // console.log(res);
        this.itemsAvailable = res;
      },
        (error) => {
          console.log(error);
      });
      // text being entered
      this._id = -1;
    }
  }

  registerItem() {
    // API call to create new item
    return this.apiService.createItem(this.title,
      this.description,
      this.tagsToItems(this.categories),
      this.tagsToItems(this.allergens),
      this.image);
  }

  publishItem() {
    // check item form
    if (this._id == -1) {
      this.registerItem().subscribe((res: any) => {
        this._id = res._id;
        this.apiService.publishItem(this._id, this.date, this.servings, this.price).subscribe((res: any) => {
          console.log(res);
        },
          (error) => {
            console.log(error);
          });
      },
        (error) => {
          console.log(error);
        });
    } else {

      this.apiService.publishItem(this._id, this.date, this.servings, this.price).subscribe((res: any) => {
        console.log(res);
      },
        (error) => {
          console.log(error);
        });
    }
  }
}
