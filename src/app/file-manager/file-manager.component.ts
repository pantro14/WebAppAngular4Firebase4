import { Component, OnInit } from '@angular/core';

import { FileService } from '../providers/file.service';
import { FileManager } from '../file-manager/file-manager';
import { Firmware } from '../models/firmware';
import { FileEnvironment } from '../file-manager/file-environment';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  selectedFile: FileList;
  currentFile: FileManager;

  constructor(public fileService: FileService) { }
 
  ngOnInit() {
  	//this.doBrowseFiles();
  }

  detectFiles(event) {
      this.selectedFile = event.target.files;
  }

  doUploadFile(event){
  	let file = this.selectedFile.item(0);
  	let firmware = new Firmware(file.name);
  	this.currentFile = new FileManager(file, firmware);
  	let fileEnv = FileEnvironment.archived;
  	let peripheral = "BushidoSmartPeripheral";
  	this.fileService.uploadFile(fileEnv, peripheral, this.currentFile);
  }

}
