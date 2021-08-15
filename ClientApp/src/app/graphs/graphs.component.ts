import { Component, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  outputs = [];

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event) {
    if (!this.outputs.length) {
      document.getElementById('graph').innerHTML = '';
    } else {
      graphviz('#graph').fit(true).renderDot(this.outputs[$event.index].graph);
    }
  }

}
