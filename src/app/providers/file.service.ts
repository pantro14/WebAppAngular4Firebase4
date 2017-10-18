import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { FileManager } from '../file-manager/file-manager';
import { Firmware } from '../models/firmware';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FileService {

  firmware: Firmware;
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  
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
    //this.db.list(`${basePath}/`).push(firmwareItem);
  }

}
