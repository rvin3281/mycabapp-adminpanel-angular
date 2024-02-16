import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewdriverComponent } from './addnewdriver.component';

describe('AddnewdriverComponent', () => {
  let component: AddnewdriverComponent;
  let fixture: ComponentFixture<AddnewdriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewdriverComponent]
    });
    fixture = TestBed.createComponent(AddnewdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
