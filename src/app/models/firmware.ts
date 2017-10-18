export class Firmware {
  fileName:String;
  extension:String;
  downloadURL:String;
  progress:number;
  version: number;
  versionType: String;
  createdAt: Date;
 
  constructor(fileName:String, downloadURL?:String, progress?:number, extension?:String,
     version?: number, versionType?: String) {
    this.fileName = fileName;
    this.extension = (extension == undefined ? "" : extension);
    this.downloadURL = downloadURL;
    this.progress = progress;
    this.version = (version == undefined ? 0 : version);
    this.versionType = (versionType == undefined ? "" : versionType);
    this.createdAt = new Date();
  }


/*  set setFileName(fileName:String) {
        this.fileName = fileName;
  }

  get getFileName():String {
     return this.fileName;
  }

  set setDownloadURL(downloadURL:String) {
        this.downloadURL = downloadURL;
  }

  get getDownloadURL():String {
     return this.downloadURL;
  }

  set setProgress(progress:number) {
        this.progress = progress;
  }

  get getProgress():number {
     return this.progress;
  }*/
}