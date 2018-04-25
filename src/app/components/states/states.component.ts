import { Component, OnInit } from '@angular/core'
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  states: any=['IA','OH'];
  constructor(private dbService: DataService) { }

  // getState() {
  //   this.dbService.getStates().subscribe(res => { this.states=res; console.log(res) });
  // }
  ngOnInit() {
   // this.getState();
  }

trackStateChange(event){
  console.log(event.target.value+"---------------------")
}

}
