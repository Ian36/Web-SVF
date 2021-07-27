import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvfComponent } from './svf.component';

describe('SvfComponent', () => {
  let component: SvfComponent;
  let fixture: ComponentFixture<SvfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
