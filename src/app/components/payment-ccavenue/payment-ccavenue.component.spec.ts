import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCCAvenueComponent } from './payment-ccavenue.component';

describe('PaymentCCAvenueComponent', () => {
  let component: PaymentCCAvenueComponent;
  let fixture: ComponentFixture<PaymentCCAvenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCCAvenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentCCAvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
