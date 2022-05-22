import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  @Output() hideLandingPageEmitter = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  hideLandingPage() {
    this.hideLandingPageEmitter.emit();
  }

}
