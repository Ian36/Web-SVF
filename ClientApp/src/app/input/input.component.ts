import { Component, Input, OnInit } from '@angular/core';
import { IFile } from '../models/file';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() selectedFile: IFile;

  constructor() { }

  ngOnInit(): void {
  }

}
