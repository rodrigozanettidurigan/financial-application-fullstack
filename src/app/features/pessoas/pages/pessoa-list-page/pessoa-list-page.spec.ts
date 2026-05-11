import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaListPage } from './pessoa-list-page';

describe('PessoaListPage', () => {
  let component: PessoaListPage;
  let fixture: ComponentFixture<PessoaListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
