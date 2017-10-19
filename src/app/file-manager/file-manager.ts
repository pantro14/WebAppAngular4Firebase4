import { Firmware } from '../models/firmware'; 

export class FileManager {
  public file:File;
  public firmware: Firmware;


  constructor(file:File, firmware: Firmware) {
    this.file = file;
    this.firmware = firmware;
  }
}