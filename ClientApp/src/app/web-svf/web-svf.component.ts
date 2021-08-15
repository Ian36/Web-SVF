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
  files: IFile[] = [];
  constructor(private svfService: SvfService) { }

  @ViewChild('input') input: InputComponent;
  @ViewChild('output') output: OutputComponent;
  @ViewChild('graphs') graphs: GraphsComponent;

  ngOnInit(): void {
    this.initialiseDirectory();
  }

  run() {
    this.svfService.run({ input: this.selectedFile.data }).subscribe(
      (result) => {
        this.output.output += result.output;
        this.graphs.outputs = result.graphs;
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
      name: 'Untitled File',
      data: "Enter your code here..."
    });
    this.selectedFile = this.files[0];
    console.log('Selected file is: ' + this.selectedFile.id);
  }

  createNewFile() {
    const newFile = {
      id: this.files.length,
      name: 'Untitled File' + this.files.length,
      data: "Enter your code here..."
    };
    this.files.push(newFile);
    this.switchFile(newFile);

  }

  switchFile(file) {
    this.selectedFile = file;
  }

}
