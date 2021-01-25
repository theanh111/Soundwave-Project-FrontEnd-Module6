import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsByCategorynameComponent } from './songs-by-categoryname.component';

describe('SongsByCategorynameComponent', () => {
  let component: SongsByCategorynameComponent;
  let fixture: ComponentFixture<SongsByCategorynameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsByCategorynameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsByCategorynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
