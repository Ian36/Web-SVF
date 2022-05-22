import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphsComponent } from '../graphs/graphs.component';
import { InputComponent } from '../input/input.component';
import { IFile } from '../models/file';
import { OutputComponent } from '../output/output.component';
import { SvfService } from '../svf.service';

@Component({
  selector: 'app-web-svf',
  templateUrl: './web-svf.component.html',
  styleUrls: ['./web-svf.component.css']
})
export class WebSvfComponent implements OnInit {
  selectedFile: IFile;
  selectedLlvm: string;
  files: IFile[] = [];
  displayLandingPage = true;
  defaultOptions: string = "-S -c -g -fno-discard-value-names -emit-llvm"
  compileOptions: string;
  output: string;

  constructor(private svfService: SvfService) { }

  @ViewChild('input') input: InputComponent;
  // @ViewChild('output') output: OutputComponent;
  @ViewChild('graphs') graphs: GraphsComponent;

  ngOnInit(): void {
    this.initialiseDirectory();
    this.resetCompileOptions();
  }

  resetCompileOptions() {
    this.compileOptions = this.defaultOptions;
  }

  run() {
    this.svfService.run({ input: this.selectedFile.data, compileOptions: this.compileOptions }).subscribe(
      (result) => {
        console.log(result);
        // this.output.output += '\n' + result.output;
        this.output += '\n' + result.output;
        this.graphs.outputs = result.graphs;
        this.selectedLlvm = result.llvm;
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initialiseDirectory() {
    this.files.push({
      id: this.files.length,
      name: 'New File',
      data: "#include <stdio.h>\nint main() {\n   \/\/ printf() displays the string inside quotation\n   printf(\"Hello, World!\");\n   return 0;\n};"
    });
    this.selectedFile = this.files[0];
    console.log('Selected file is: ' + this.selectedFile.id);
  }

  createNewFile() {
    const newFile = {
      id: this.files.length,
      name: 'New File ' + this.files.length,
      data: "Enter your code here..."
    };
    this.files.push(newFile);
    this.switchFile(newFile);

  }

  switchFile(file) {
    this.selectedFile = file;
  }

  selectLineOnInput(event) {
    this.input.selectLine(parseInt(event));
  }

  hideLandingPage() {
    this.displayLandingPage = false;
  }
}
