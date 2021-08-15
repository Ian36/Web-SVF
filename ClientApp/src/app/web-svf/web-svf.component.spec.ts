import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSvfComponent } from './web-svf.component';

describe('WebSvfComponent', () => {
  let component: WebSvfComponent;
  let fixture: ComponentFixture<WebSvfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSvfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
