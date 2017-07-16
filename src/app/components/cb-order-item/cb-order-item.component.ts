import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cb-order-item',
  templateUrl: './cb-order-item.component.html',
  styleUrls: ['./cb-order-item.component.scss']
})
export class CbOrderItemComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
