import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCabComponent } from './add-new-cab.component';

describe('AddNewCabComponent', () => {
  let component: AddNewCabComponent;
  let fixture: ComponentFixture<AddNewCabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCabComponent]
    });
    fixture = TestBed.createComponent(AddNewCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
