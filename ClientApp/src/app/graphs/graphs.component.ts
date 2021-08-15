import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { wasmFolder } from '@hpcc-js/wasm';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit {
  outputs = [];

  constructor() { }

  ngOnInit(): void {
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
  }

  onTabChanged($event) {
    console.log('ontabchange');

    var renderer = graphviz([]);
    if (!this.outputs.length) {
      document.getElementById('graph').innerHTML = '';
    } else {
      var height = window.innerHeight;
      var width = window.innerWidth;
      graphviz('#graph', {height: height, width: width}).renderDot(this.outputs[$event.index].graph);
    }
  }

}
