import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTestComponent } from './ver-test.component';

describe('VerTestComponent', () => {
  let component: VerTestComponent;
  let fixture: ComponentFixture<VerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
