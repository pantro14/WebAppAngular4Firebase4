import { Firmware } from '../models/firmware'; 

export class FileManager {
  public _file:File;
  public _firmware: Firmware;


  constructor(file:File, firmware: Firmware) {
    this._file = file;
    this._firmware = firmware;
  }

  get firmware():Firmware {
     return this._firmware;
  }

  get file():File {
     return this._file;
  }
}