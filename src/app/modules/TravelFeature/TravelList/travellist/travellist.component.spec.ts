import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellistComponent } from './travellist.component';

describe('TravellistComponent', () => {
  let component: TravellistComponent;
  let fixture: ComponentFixture<TravellistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellistComponent]
    });
    fixture = TestBed.createComponent(TravellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
