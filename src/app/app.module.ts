import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgfbauthMaterialModule} from './ngfbauth-material/ngfbauth-material.module';


import { AuthService } from './providers/auth.service';
import { FileService } from './providers/file.service';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    FileManagerComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgfbauthMaterialModule
  ],
  providers: [AuthService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }