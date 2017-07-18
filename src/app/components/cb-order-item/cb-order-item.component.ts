import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-cb-order-item',
  templateUrl: './cb-order-item.component.html',
  styleUrls: ['./cb-order-item.component.scss']
})
export class CbOrderItemComponent implements OnInit, OnDestroy {
  id: string;
  item: any = null;
  private sub: any;

  constructor(private bcService: BackendService, private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getItem();
      // assume some food id 
      // Check validity of id
    });
  }

  getItem() {
    this.bcService.getPublishedItems(this.id).subscribe(
      (res: any[]) => {
        console.log("Item received for ordering: " + res.length);
        console.log(res[0]);
        this.item=res[0];
      },
      (error) => { console.log(error); 
        setTimeout(() => { this.router.navigate(['/find-food']); }, 2000);
        console.log("Failed while retrieving order item");
    }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
