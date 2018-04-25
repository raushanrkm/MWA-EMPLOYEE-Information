import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import{StatesComponent} from '../app/components/states/states.component';
import { ReactiveModelFormComponent } from './reactive-model-form/reactive-model-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataService } from '../app/services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { SignInComponentComponent } from './components/sign-in-component/sign-in-component.component';
import { SignUpComponentComponent } from './components/sign-up-component/sign-up-component.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { ShowComponentComponent } from './components/show-component/show-component.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/services/token.interceptor'
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';import { AuthService } from './services/auth.service';
4
const My_Route = [  


  {path:'add', component:TemplateFormComponent },
  {path:'signup',component:SignUpComponentComponent},
  {path:'homepage',component:HomeComponentComponent},
  {path:'update',component:UpdateprofileComponent},
  {path:'search',component:SearchComponentComponent},
  {path: 'showprofile',component:ShowComponentComponent},
  
];
@NgModule({
  declarations: [
    AppComponent,
    ReactiveModelFormComponent,
    TemplateFormComponent,
    StatesComponent,
    HomeComponentComponent,
    SignInComponentComponent,
    SignUpComponentComponent,
    SearchComponentComponent,
    ShowComponentComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(My_Route)
    
  ],
  providers: [DataService,AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
