import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatToolbarModule, MatIconModule
  ],
  exports: [
  	MatToolbarModule, MatIconModule
  ],
  declarations: []
})
export class NgfbauthMaterialModule { }
