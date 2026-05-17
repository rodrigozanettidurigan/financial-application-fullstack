import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoFormPage } from './lancamento-form-page';

describe('LancamentoFormPage', () => {
  let component: LancamentoFormPage;
  let fixture: ComponentFixture<LancamentoFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
