import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-cb-order-item',
  templateUrl: './cb-order-item.component.html',
  styleUrls: ['./cb-order-item.component.scss']
})
export class CbOrderItemComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;

  constructor(private bcService: BackendService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       // assume some food id 
       // Check validity of id
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
