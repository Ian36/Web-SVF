import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  defaultOptions: string = "-S -c -g -fno-discard-value-names -emit-llvm"
  compileOptions: string;

  constructor() { }

  @Output() runEventEmitter = new EventEmitter<string>();

  ngOnInit(): void {
    this.resetCompileOptions();
  }

  run() {
    this.runEventEmitter.emit(this.compileOptions);
  }

  resetCompileOptions() {
    this.compileOptions = this.defaultOptions;
  }

}
