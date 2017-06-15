import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbPublishItemComponent } from './cb-publish-item.component';

describe('CbPublishFoodComponent', () => {
  let component: CbPublishItemComponent;
  let fixture: ComponentFixture<CbPublishItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CbPublishItemComponent]
    }).compileComponents();
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

