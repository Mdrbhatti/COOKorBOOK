import { CbHeaderComponent } from '../shared/cb-header/cb-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CbFindFoodComponent } from './cb-find-food.component';

describe('CbFindFoodComponent', () => {
  let component: CbFindFoodComponent;
  let fixture: ComponentFixture<CbFindFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbFindFoodComponent, CbHeaderComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbFindFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
