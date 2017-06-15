import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CbFindFoodComponent } from './components/cb-find-food/cb-find-food.component';
import { CbHeaderComponent } from './components/shared/cb-header/cb-header.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';

const appRoutes: Routes = [
  { path: 'find-food', component: CbFindFoodComponent },
  { path: '', component: FrontpageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CbFindFoodComponent,
    CbHeaderComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
