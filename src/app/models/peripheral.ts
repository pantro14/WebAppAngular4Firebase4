import { Firmware } from '../models/firmware';

export class Peripheral {
  peripheralName:string;
  firmwarePackage:Firmware[];
 
  constructor(peripheralName:string, firmwarePackage?:Firmware[]) {
    this.peripheralName = peripheralName;
    this.firmwarePackage = firmwarePackage;
  }
}