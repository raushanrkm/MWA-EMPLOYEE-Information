import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor(private router: Router  ) { }

  ngOnInit() {
  }
  editprofile(){
this.router.navigate(['update'])
  }

  deleteprofile(){

  }
}

