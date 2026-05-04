import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExchange } from './stock-exchange';

describe('StockExchange', () => {
  let component: StockExchange;
  let fixture: ComponentFixture<StockExchange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockExchange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockExchange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
