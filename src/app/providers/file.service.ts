import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'

import { FileManager } from '../file-manager/file-manager';
import { Firmware } from '../models/firmware';

import { Headers, Http, Response } from '@angular/http';

import * as firebase from 'firebase/app';
import * as JSZip from "jszip";
import * as _ from "lodash";
import * as fileSaver from 'file-saver';

import 'rxjs/add/operator/toPromise';
import 'firebase/storage';

@Injectable()
export class FileService {

  firmware: Firmware;
  constructor(public afAuth: AngularFireAuth, private http: Http) { }
  
  //constructor(public afAuth: AngularFireAuth) { }

  public uploadFile(environment: string, peripheral: string, fileManager: FileManager){ 
  	let storageRef = firebase.storage().ref();
  	this.firmware = fileManager.firmware;
  	let file = fileManager.file;
  	let uploadTask = storageRef.child(environment+"/"+this.firmware.fileName).put(file);

  	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  { // upload in progress
        this.firmware.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => { // upload failed
        console.log(error) 
      },
      () => { // upload success
      	this.firmware.downloadURL = uploadTask.snapshot.downloadURL;
      	var basePath = environment+"/"+peripheral+"/";
        this.saveFileData("/"+basePath,this.firmware);
      }
    );
  }

  private saveFileData(basePath:string, firmwareItem: Firmware) {
  	let dataBaseRef = firebase.database().ref(basePath);
  	dataBaseRef.push(firmwareItem, (onComplete) =>  { // task completed on server
        console.log("firmware added with key: "+ dataBaseRef.key);
    });
  }

  public loadPeripherals(fileEnv:string){
  	let dataBaseRef = firebase.database().ref();
  	let fileEnvironmentRef = dataBaseRef.child(fileEnv);
  	return fileEnvironmentRef.once('value');  	
  }

  public downloadFile(url:string): Promise<Blob>{
    let storageRef = firebase.storage().ref();
    //let url = "https://firebasestorage.googleapis.com/v0/b/ngfbauth-367ef.appspot.com/o/Archived%2FBushidoIII_ApplicationImage_3_1_10.bin?alt=media&token=42f6dfaf-de2a-4adf-bf26-3bddfb9007b4"; 
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return new Blob([response["_body"]], {
           type: response.headers.get("Content-Type")
        });
      })
      .catch(this.handleError);
  }

  public zipFile(firmwarePackage:any[]){
    let zip = new JSZip();
    _.each(firmwarePackage, (filePackage) => {
       zip.folder("firmware_package").file(filePackage.name, filePackage.blob);      
    });
    zip.generateAsync({type:"blob"}).then((blob) => { // 1) generate the zip file
        fileSaver.saveAs(blob, "firmwarePackage.zip");          // 2) trigger the download
    }, (err) => {
        console.log(err);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
