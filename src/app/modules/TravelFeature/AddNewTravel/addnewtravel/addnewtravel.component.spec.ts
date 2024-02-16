import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewtravelComponent } from './addnewtravel.component';

describe('AddnewtravelComponent', () => {
  let component: AddnewtravelComponent;
  let fixture: ComponentFixture<AddnewtravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewtravelComponent]
    });
    fixture = TestBed.createComponent(AddnewtravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
