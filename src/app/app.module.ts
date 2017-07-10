import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AppComponent } from './app.component';
import { CbFindFoodComponent } from './components/cb-find-food/cb-find-food.component';
import { CbPublishItemComponent } from './components/cb-publish-item/cb-publish-item.component';
import { CbHeaderComponent } from './components/shared/cb-header/cb-header.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: FrontpageComponent, pathMatch: 'full'  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'find-food', component: CbFindFoodComponent },
  { path: 'cook-food', component: CbPublishItemComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CbHeaderComponent,
    CbFindFoodComponent,
    FrontpageComponent,
    RegisterComponent,
    LoginComponent,
    CbPublishItemComponent,
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NguiDatetimePickerModule,
    NguiAutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
