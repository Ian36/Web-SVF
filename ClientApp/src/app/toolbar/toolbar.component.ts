import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SvfService } from '../svf.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  defaultOptions: string = "-S -c -g -fno-discard-value-names -emit-llvm"
  compileOptions: string;
  isLoading: boolean = false;

  constructor(private svfService: SvfService) { }

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

  updateWebSvf() {
    this.isLoading = true; 
    this.svfService.updateSvf().subscribe(result => {
      console.log(result);
      console.log(result.Response);
    this.isLoading = false; 

    });
  }

}
