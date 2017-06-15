import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbFindFoodComponent } from './cb-find-food.component';

describe('CbFindFoodComponent', () => {
  let component: CbFindFoodComponent;
  let fixture: ComponentFixture<CbFindFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbFindFoodComponent ]
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
