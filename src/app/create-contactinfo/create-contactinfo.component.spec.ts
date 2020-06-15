import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactinfoComponent } from './create-contactinfo.component';

describe('CreateContactinfoComponent', () => {
  let component: CreateContactinfoComponent;
  let fixture: ComponentFixture<CreateContactinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContactinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
