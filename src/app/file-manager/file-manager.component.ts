import { Component, OnInit } from '@angular/core';

import { FileService } from '../providers/file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  constructor(public fileService: FileService) { }
 
  ngOnInit() {
  	this.doBrowseFiles();
  }

  doBrowseFiles(){
  	this.fileService.browseFolder();
  }

}
