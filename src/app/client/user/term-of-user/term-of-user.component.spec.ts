import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOfUserComponent } from './term-of-user.component';

describe('TermOfUserComponent', () => {
  let component: TermOfUserComponent;
  let fixture: ComponentFixture<TermOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
