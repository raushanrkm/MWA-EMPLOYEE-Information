import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  passToShow(){
    this.router.navigate(['showprofile']);
  }

  addCustomer(){
    this.router.navigate(['add']);
  }

}
