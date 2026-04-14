import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { perfilCompletoGuard } from './perfil-completo.guard';

describe('perfilCompletoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => perfilCompletoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
