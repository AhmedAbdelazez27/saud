import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesListsComponent } from './services-lists.component';

describe('ServicesListsComponent', () => {
  let component: ServicesListsComponent;
  let fixture: ComponentFixture<ServicesListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
