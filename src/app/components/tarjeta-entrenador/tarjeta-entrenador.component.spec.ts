import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEntrenadorComponent } from './tarjeta-entrenador.component';

describe('TarjetaEntrenadorComponent', () => {
  let component: TarjetaEntrenadorComponent;
  let fixture: ComponentFixture<TarjetaEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaEntrenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
