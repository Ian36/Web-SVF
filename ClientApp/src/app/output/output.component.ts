import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  output = 'The output of your code will be displayed here.';
  constructor() { }

  ngOnInit(): void {
  }

}
