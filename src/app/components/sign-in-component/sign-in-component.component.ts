import { Component, OnInit, Injectable, Input } from '@angular/core';
import { SignUpComponentComponent } from '../sign-up-component/sign-up-component.component';
import {HomeComponentComponent} from '../home-component/home-component.component'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})

export class SignInComponentComponent implements OnInit {
  @Input() email:string;
  @Input() password: string;
  constructor(private router: Router,private authService: AuthService) { 
  }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.email, this.password);
    this.router.navigate(['homepage']);
  }

}
