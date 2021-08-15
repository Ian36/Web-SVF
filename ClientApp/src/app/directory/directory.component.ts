import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFile } from '../models/file';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  @Output() switchFileEventEmitter = new EventEmitter<any>();
  @Output() createNewFileEventEmitter = new EventEmitter<any>();
  @Input() files;
  @Input() selectedFile;
  constructor() { }

  ngOnInit(): void {
  }

  switchFile(file) {
    console.log(file);
    this.selectedFile = file;
    this.switchFileEventEmitter.emit(file);
  }

  createNewFile() {
    this.createNewFileEventEmitter.emit();
  }

}
