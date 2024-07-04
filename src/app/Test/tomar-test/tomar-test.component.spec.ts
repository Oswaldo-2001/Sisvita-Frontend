import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarTestComponent } from './tomar-test.component';

describe('TomarTestComponent', () => {
  let component: TomarTestComponent;
  let fixture: ComponentFixture<TomarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TomarTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
