import { Component, OnInit, ViewChild } from '@angular/core';
import { Signup } from './Signup';
import { StatesComponent } from '../components/states/states.component'
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  model: Signup = new Signup();

  @ViewChild('f') form: any;

  states: any = ['IA', 'OH'];
  cities: any = ['IA', 'facebook'];

  constructor(private dbService: DataService) { }
  ngOnInit() {
    this.getState();
  }

  onSubmit() {
    // if (this.form.valid) {
    //   console.log("Form Submitted!");
    //   this.form.reset();
    // }
    if( confirm(`${this.model.firstName}`)) {
      
      alert("ok");
       alert('token='+localStorage.getItem('token'));
      this.dbService.savedata(this.model).subscribe(data=>console.log(data));

    } else {
      alert("cancle");
    }
  }


  getState() {
    this.dbService.getStates().subscribe(res => { this.states = res; console.log(res) });
  }
  trackStateChange(event) {
    console.log(event.target.value + "---------------------")
  }
  trackCityChange(event) {
    console.log(event.target.value + "---------------------")
  }
  
}
