import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencysComponent } from './emergencys.component';

describe('EmergencysComponent', () => {
  let component: EmergencysComponent;
  let fixture: ComponentFixture<EmergencysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
