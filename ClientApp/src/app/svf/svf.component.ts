import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { graphviz } from 'd3-graphviz';
import { wasmFolder } from '@hpcc-js/wasm';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-svf',
  templateUrl: './svf.component.html',
  styleUrls: ['./svf.component.css'],
})
export class SvfComponent implements OnInit {
  readOnly = false;
  input;
  outputs = [];
  disableRunBtn = false;
  http;
  baseUrl;
  selectedIndex = 0;
  change;
  commandLineOutput;

  constructor(
    public dialog: MatDialog,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    change: ChangeDetectorRef
  ) {
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
      console.log('submitting code: ' + this.input);
      this.disableRunBtn = true;
      const requestBody = { input: this.input };
      this.http.post(this.baseUrl + 'svf', requestBody).subscribe(
        (result) => {
          this.outputs = result.graphs;
          this.commandLineOutput = result.output;
          console.log(result);
          this.disableRunBtn = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onTabChanged($event) {
    if (!this.outputs.length) {
      document.getElementById('graph').innerHTML = '';
    } else {
      graphviz('#graph').fit(true).renderDot(this.outputs[$event.index].graph);
    }
  }

  isInputEmpty() {
    return !this.input;
  }

  openDialog() {
    this.dialog.open(EmptyFieldDialogComponent);
  }
}

@Component({
  selector: 'app-empty-field-dialog',
  templateUrl: 'empty-field-dialog.html',
})
export class EmptyFieldDialogComponent {
  constructor(public dialog: MatDialog) {}
  close() {
    this.dialog.closeAll();
  }
}
