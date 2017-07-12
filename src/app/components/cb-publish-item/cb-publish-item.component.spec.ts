import { CbHeaderComponent } from '../shared/cb-header/cb-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CbPublishItemComponent } from './cb-publish-item.component';

describe('CbPublishItemComponent', () => {
  let component: CbPublishItemComponent;
  let fixture: ComponentFixture<CbPublishItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CbPublishItemComponent,
        CbHeaderComponent
      ],
      imports: [
        TagInputModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule,
        NguiDatetimePickerModule,
        NguiAutoCompleteModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbPublishItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
