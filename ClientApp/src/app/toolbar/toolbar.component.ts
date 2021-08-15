import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  @Output() runEventEmitter = new EventEmitter<any>();

  ngOnInit(): void {
  }

  run() {
    this.runEventEmitter.emit();
  }

}
