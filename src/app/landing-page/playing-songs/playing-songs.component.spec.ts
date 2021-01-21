import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingSongsComponent } from './playing-songs.component';

describe('PlayingSongsComponent', () => {
  let component: PlayingSongsComponent;
  let fixture: ComponentFixture<PlayingSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
