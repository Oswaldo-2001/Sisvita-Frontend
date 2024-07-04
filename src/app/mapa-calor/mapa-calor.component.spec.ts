import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GoogleMap} from '@angular/google-maps';
import { MapaCalorComponent } from './mapa-calor.component';
import {
  Input,
  OnDestroy,
  OnInit,
  NgZone,
  Directive,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

describe('MapaCalorComponent', () => {
  let component: MapaCalorComponent;
  let fixture: ComponentFixture<MapaCalorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaCalorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaCalorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
