import { Component, ElementRef, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { wasmFolder } from '@hpcc-js/wasm';
import { graphviz } from 'd3-graphviz';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit {
  @Output() selectLineOnInput = new EventEmitter();
  
  outputs = [];

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
  }

  onTabChanged($event) {
    var renderer = graphviz([]);
    if (!this.outputs.length) {
      document.getElementById('graph').innerHTML = '';
    } else {
      var height = window.innerHeight;
      var width = window.innerWidth;
      graphviz('#graph', {height: height, width: width}).renderDot(this.outputs[$event.index].graph);
      setTimeout(() => {
        this.addNodeEventListeners();
      }, 1000);
    }
  }

  addNodeEventListeners() {
    let nodes = this.elementRef.nativeElement.querySelectorAll('.node');
    console.log(this.elementRef.nativeElement.querySelectorAll('.node'));

    nodes.forEach(element => {
      element.addEventListener('click', this.onClick.bind(this));
    });
    // this.elementRef.nativeElement.querySelectorAll('.node')
    //   .addEventListener('click', this.onClick.bind(this));
  }
  
  onClick(event) {
    let msg = event.path[0].innerHTML as string;

    let searchQuery = "line: ";
    let charAt = msg.search(searchQuery);
    if(charAt == -1) {
      searchQuery = "ln: ";
      charAt = msg.search(searchQuery);
    }
    if(charAt != -1) {
      let lineNumber = msg.substring(charAt + searchQuery.length);
      lineNumber = lineNumber.substring(0, lineNumber.indexOf(" "));
      this.selectLineOnInput.emit(lineNumber);
    }
  }

}
