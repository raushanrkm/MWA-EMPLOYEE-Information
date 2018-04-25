import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {
  @Input() email:string;
  @Input() password: string;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
  }

  onCreate(){
    let userInfo = {email: this.email,password: this.password};
    
    this.authService.signup(userInfo);
   // this.router.navigate(['signin']);
  }

  onSubmit()
  {
    this.onCreate();
  }
}
