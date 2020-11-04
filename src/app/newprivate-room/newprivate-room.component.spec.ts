import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprivateRoomComponent } from './newprivate-room.component';

describe('NewprivateRoomComponent', () => {
  let component: NewprivateRoomComponent;
  let fixture: ComponentFixture<NewprivateRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprivateRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprivateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
