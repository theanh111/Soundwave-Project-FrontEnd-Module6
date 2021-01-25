import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsBySingernameComponent } from './songs-by-singername.component';

describe('SongsBySingernameComponent', () => {
  let component: SongsBySingernameComponent;
  let fixture: ComponentFixture<SongsBySingernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsBySingernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsBySingernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
