import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingroomComponent } from './chattingroom.component';

describe('ChattingroomComponent', () => {
  let component: ChattingroomComponent;
  let fixture: ComponentFixture<ChattingroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattingroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattingroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
