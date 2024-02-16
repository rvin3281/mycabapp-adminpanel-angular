import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcabComponent } from './editcab.component';

describe('EditcabComponent', () => {
  let component: EditcabComponent;
  let fixture: ComponentFixture<EditcabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcabComponent]
    });
    fixture = TestBed.createComponent(EditcabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
