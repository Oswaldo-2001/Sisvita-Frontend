import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResultadosTestComponent } from './ver-resultados-test.component';

describe('VerResultadosTestComponent', () => {
  let component: VerResultadosTestComponent;
  let fixture: ComponentFixture<VerResultadosTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerResultadosTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerResultadosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
