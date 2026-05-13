import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPerfil } from './config-perfil';

describe('ConfigPerfil', () => {
  let component: ConfigPerfil;
  let fixture: ComponentFixture<ConfigPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
