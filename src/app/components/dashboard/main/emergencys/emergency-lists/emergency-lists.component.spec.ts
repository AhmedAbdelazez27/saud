import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyListsComponent } from './emergency-lists.component';

describe('EmergencyListsComponent', () => {
  let component: EmergencyListsComponent;
  let fixture: ComponentFixture<EmergencyListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
