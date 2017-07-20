import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import * as moment from 'moment';
@Component({
  selector: 'app-cb-order-item',
  templateUrl: './cb-order-item.component.html',
  styleUrls: ['./cb-order-item.component.scss']
})
export class CbOrderItemComponent implements OnInit, OnDestroy {
  id: string;
  item: any = null;
  private sub: any;
  selectedServings: number = 0;
  price: number;
  selectedPickupTime: string = "";
  buyerComments: string = "Write here";
  serverResponse = true;
  clicked = false;
  orderFail = true;
  successOrder = {};
  isOrderSuccessful = false;
  constructor(private bcService: BackendService, private route: ActivatedRoute,
    private router: Router) { }

  rangeFaker(num) { return new Array(num); }

  ngOnInit() {
    this.serverResponse = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
    });
  }

  orderItem() {
    let orderReq = {
      "pickUptime": this.selectedPickupTime,
      "servings": this.selectedServings,
      "buyerComments": this.buyerComments == 'Write here' ? " " : this.buyerComments,
      "price": (this.selectedServings * this.item.pricePerPortion)
    };
    this.bcService.orderItem(this.id, orderReq).subscribe(
      (res: any) => {
        console.log("Item ordered: ");
        console.log(res);
        this.successOrder = res;
        this.isOrderSuccessful = true;
        setTimeout(() => { this.router.navigate(['/find-food']); }, 50000);
      },
      (error) => {
        console.log(error);
        // setTimeout(() => { this.router.navigate(['/find-food']); }, 1000);
        console.log("Failed while ordering item");
        this.orderFail = false;
      }
    );
  }

  getItem() {
    this.bcService.getPublishedItems(this.id).subscribe(
      (res: any[]) => {
        console.log("Item received for ordering: " + res.length);
        console.log(res[0]);
        this.item = res[0];
        res[0].pickupTime.forEach(function (part, index, theArray) {
          theArray[index] = moment(theArray[index]).format('lll');
        });
      },
      (error) => {
        console.log(error);
        this.serverResponse = false;
        console.log("Failed while retrieving order item");
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
