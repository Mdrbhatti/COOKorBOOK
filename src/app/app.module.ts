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
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HttpModule } from '@angular/http';
import { ManageComponent } from './components/manage-inventory/manage-inventory.component';
import { ImageUploadModule } from 'ng2-imageupload';
import { FilterSearchResultsPipe } from './components/cb-find-food/cb-food-search.pipe';
import {ManageService} from "./services/manage.service";
import { CbOrderItemComponent } from './components/cb-order-item/cb-order-item.component';
import { CbFooterComponent } from './components/shared/cb-footer/cb-footer.component';

const appRoutes: Routes = [
  { path: '', component: FrontpageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-inventory', component: ManageComponent, canActivate: [AuthGuard] },
  { path: 'find-food', component: CbFindFoodComponent, canActivate: [AuthGuard] },
  { path: 'cook-food', component: CbPublishItemComponent, canActivate: [AuthGuard] },
  { path: 'order-food/:id', component: CbOrderItemComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // TODO: Add ID here
  // { path: '**', redirectTo: '', pathMatch: 'full' },
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
    FilterSearchResultsPipe,
    CbOrderItemComponent,
    ProfileComponent,
    CbFooterComponent,
    ManageComponent,
    FilterSearchResultsPipe
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NguiDatetimePickerModule,
    NguiAutoCompleteModule,
    HttpModule,
    RouterModule,
    ImageUploadModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ManageService,
    BackendService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
