import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurityDataCollectorComponent } from './purity-data-collector.component';

describe('PurityDataCollectorComponent', () => {
  let component: PurityDataCollectorComponent;
  let fixture: ComponentFixture<PurityDataCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurityDataCollectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurityDataCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
