import { Component, OnInit } from '@angular/core';

import { FileService } from '../providers/file.service';
import { FileManager } from '../file-manager/file-manager';
import { Firmware } from '../models/firmware';
import { Peripheral } from '../models/peripheral';

import { FileEnvironment } from '../file-manager/file-environment';

import * as _ from "lodash";
import * as Nanobar from "nanobar";



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

  firmwarePackage = [];

  

  constructor(public fileService: FileService) { }
 
  ngOnInit() {
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

    var options = {
      classname: 'my-class',
      id: 'my-id',
      target: document.getElementById('myDivId')
    };

    var nanobar = new Nanobar( options );

    nanobar.go( 30 ); // size bar 30%
    nanobar.go( 76 ); // size bar 76%
    nanobar.go(100);

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

  doDownloadZip(event){
    this.firmwarePackage = 
    [{
      name: "BushidoIII_ApplicationImage_3_1_10.bin",
      url: "https://firebasestorage.googleapis.com/v0/b/ngfbauth-367ef.appspot.com/o/Archived%2FBushidoIII_ApplicationImage_3_1_10.bin?alt=media&token=42f6dfaf-de2a-4adf-bf26-3bddfb9007b4",
      blob: new Blob
    },
    {
      name: "Flux_brake_035_ID86.bin",
      url: "https://firebasestorage.googleapis.com/v0/b/ngfbauth-367ef.appspot.com/o/Archived%2FFlux_brake_035_ID86.bin?alt=media&token=53b5cf4f-1248-4461-bc00-66e22c68294d",
      blob: new Blob
    }];

    let blobFiles = [] ;

    let requests = this.firmwarePackage.map((filePackage) => {
        return new Promise((resolve) => {
          this.fileService.downloadFile(filePackage.url).then(
            (blobResponse) => {
            filePackage.blob = blobResponse;
            //blobFiles.push(blobResponse);
            resolve();
          });
        });
    })

    Promise.all(requests).then(() => 
      this.fileService.zipFile(this.firmwarePackage)
    );
  }

}
