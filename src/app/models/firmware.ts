export class Firmware {
  fileName:string;
  extension:string;
  downloadURL:string;
  progress:number;
  version: number;
  versionType: string;
  createdAt: Date;
 
  constructor(fileName:string, downloadURL?:string, progress?:number, extension?:string,
     version?: number, versionType?: string) {
    this.fileName = fileName;
    this.extension = (extension == undefined ? "" : extension);
    this.downloadURL = downloadURL;
    this.progress = progress;
    this.version = (version == undefined ? 0 : version);
    this.versionType = (versionType == undefined ? "" : versionType);
    this.createdAt = new Date();
  }
}