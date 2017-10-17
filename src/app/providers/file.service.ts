import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
//import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { FileManager } from '../file-manager/file-manager';

import { FileEnvironment } from '../file-manager/file-environment.enum';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FileService {

  //constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  constructor(public afAuth: AngularFireAuth) { }

  public browseFolder(){ 
  	let storageRef = firebase.storage().ref();
  	let archivedFolder = storageRef.child("Archived/BushidoIII_ApplicationImage_3_1_10.bin");
  	archivedFolder.getMetadata().then(function(metadata) {
  		let bucket = metadata.bucket;
	}).catch(function(error) {
	  console.log("error receiving the metadata");
	});
  }

}
