import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlatillo } from './editar-platillo';

describe('EditarPlatillo', () => {
  let component: EditarPlatillo;
  let fixture: ComponentFixture<EditarPlatillo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPlatillo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPlatillo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
