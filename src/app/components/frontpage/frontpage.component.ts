/**
 * Created by oysteinhauan on 15/06/17.
 */

import { Component } from '@angular/core';

// import template from './frontpage.template.html';

@Component ({
  selector: 'app-root',
  templateUrl: './frontpage.template.html',
  styleUrls:   ['./frontpage.component.scss']

})

export class FrontpageComponent {
  title = 'CookOrBook';
}
