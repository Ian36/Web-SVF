import { ElementRef, ViewEncapsulation } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { IFile } from '../models/file';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
  showLlvm: boolean = false;
  @Input() selectedFile: IFile;
  @Input() selectedLlvm: string;

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
  }

  selectLine(lineNumber) {
    console.log(lineNumber);
    let code = this.elementRef.nativeElement.querySelectorAll('.CodeMirror-code')[0];
    console.log(code);
    console.log(code.children.length);
    for(let i = 0; i < code.children.length; i++) {
      code.children[i].style.background = "unset";
    }
    code.children[lineNumber - 1].style.background = "Yellow";

  }
}
