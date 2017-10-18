import { Firmware } from '../models/firmware'; 

export class FileManager {
  public file:File;
  public firmware: Firmware;


  constructor(file:File, firmware: Firmware) {
    this.file = file;
    this.firmware = firmware;
  }

  // get firmware():Firmware {
  //    return this._firmware;
  // }

  // get file():File {
  //    return this._file;
  // }
}