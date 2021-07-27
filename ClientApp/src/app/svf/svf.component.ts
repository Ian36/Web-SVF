import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { graphviz } from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-svf',
  templateUrl: './svf.component.html',
  styleUrls: ['./svf.component.css']
})
export class SvfComponent implements OnInit {
  readOnly = false;
  input;
  outputs = [];
  disableRunBtn = false;
  http;
  baseUrl;
  selectedIndex: number = 0;
  change;
  constructor(public dialog: MatDialog, http: HttpClient, @Inject('BASE_URL') baseUrl: string, change: ChangeDetectorRef) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.change = change;
  }

  ngOnInit() {
    console.log(this.outputs.length);
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
  }

  submitCode() {
    if (this.isInputEmpty()) {
      this.openDialog();
    } else {
      console.log("submitting code: " + this.input);
      this.disableRunBtn = true;
      this.http.post(this.baseUrl + 'svf', this.input).subscribe(result => {
        this.outputs = result.graphs;
        console.log(this.outputs);
        window.setTimeout(() => this.renderDotGraphs(), 1000);
        this.disableRunBtn = false;
      }, error => console.error(error));
    }
  }

  renderDotGraphs() {
    console.log(document.querySelectorAll('*[id]'));

    for(var i = 0; i < this.outputs.length; i++) {
      graphviz("#mat-tab-content-0-" + i).renderDot(this.outputs[i].graph);
    }
  }

  isInputEmpty() {
    return !this.input;
  }

  openDialog() {
    this.dialog.open(EmptyFieldDialog);
  }

}

@Component({
  selector: 'empty-field-dialog',
  templateUrl: 'empty-field-dialog.html',
})
export class EmptyFieldDialog {
  constructor(public dialog: MatDialog) { }
  close() {
    this.dialog.closeAll();
  }
}