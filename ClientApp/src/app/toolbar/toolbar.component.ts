import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SvfService } from '../svf.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  defaultOptions: string = "-S -c -g -fno-discard-value-names -emit-llvm"
  compileOptions: string;
  isLoading: boolean = false;

  constructor(private svfService: SvfService, private _snackBar: MatSnackBar) { }

  @Output() runEventEmitter = new EventEmitter<string>();
  @Output() resetCompilerOptionsEmitter = new EventEmitter<string>();
  @Output() openLandingPageEmitter = new EventEmitter<any>();


  ngOnInit(): void {
    this.resetCompileOptions();
  }

  run() {
    this.runEventEmitter.emit(this.compileOptions);
  }

  openLandingPage() {
    this.openLandingPageEmitter.emit();
  }

  resetCompileOptions() {
    // this.compileOptions = this.defaultOptions;
    this.resetCompilerOptionsEmitter.emit(this.compileOptions);
  }

  updateWebSvf() {
    this.isLoading = true; 
    this.svfService.updateSvf().subscribe(result => {
      console.log(result);
    this.isLoading = false; 
    this.openSnackBar("WebSVF has been updated!");
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
