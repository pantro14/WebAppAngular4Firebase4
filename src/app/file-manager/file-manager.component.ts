import { Component, OnInit } from '@angular/core';

import { FileService } from '../providers/file.service';
import { FileManager } from '../file-manager/file-manager';
import { Firmware } from '../models/firmware';
import { Peripheral } from '../models/peripheral';

import { FileEnvironment } from '../file-manager/file-environment';

import * as _ from "lodash";


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  selectedFile: FileList;
  currentFile: FileManager;
  fileName: string;
  fileProggress: number;
  peripheralList: Peripheral[] = [];

  fileEnvList = FileEnvironment;

  

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
  	let fileEnv = this.fileEnvList.archived;
  	let peripheral = "BushidoSmartPeripheral";

  	this.fileService.uploadFile(fileEnv, peripheral, this.currentFile);
  }

  doLoadPeripheral(event){
  	console.log("inside doLoadPeripheral");
  	let loadPeripheralPromise = this.fileService.loadPeripherals(event);


  	loadPeripheralPromise.then(
  		(snapshot) => { //Success
  			 if(!snapshot || snapshot===undefined){
  			 	console.log("reference not found");
  			 }else{
  			 	let peripheralNames = Object.keys(snapshot.val());
  			 	_.forOwn(snapshot.val(), function(firmwarePckg, key) {
  			 		let peripheral = new Peripheral(key, []);
  			 		_.each(firmwarePckg, (item) => {
				      let firmware = new Firmware(item.fileName, item.downloadURL, item.progress);
				      peripheral.firmwarePackage.push(firmware);
				  	});
  			 		this.peripheralList.push(peripheral);
				});
  			 	
  			 }
		},
		(error) => { //Rejected
  			console.log(error);
		}
	);
  }

}
