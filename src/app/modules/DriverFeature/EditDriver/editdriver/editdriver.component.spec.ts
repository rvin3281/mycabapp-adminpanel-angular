import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdriverComponent } from './editdriver.component';

describe('EditdriverComponent', () => {
  let component: EditdriverComponent;
  let fixture: ComponentFixture<EditdriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdriverComponent]
    });
    fixture = TestBed.createComponent(EditdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
