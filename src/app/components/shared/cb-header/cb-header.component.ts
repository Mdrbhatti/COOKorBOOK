import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-header',
  templateUrl: './cb-header.component.html',
  styleUrls: ['./cb-header.component.scss']
})
export class CbHeaderComponent implements OnInit {
  toggleOnMobile = false;
  constructor() { }

  ngOnInit() {
  }

}
