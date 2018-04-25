import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions, Headers } from '@angular/http';
import{HttpClient} from '@angular/common/http'

@Injectable()
export class DataService {

   port :string = "http://localhost:4000";

  stateresult: any
  cityresult: any
  itemlist: any


  constructor(public http: HttpClient) { }

  getMyData() {
    if(localStorage.getItem('id_token')){
      return this.http.get(this.port + '/getZipCodes');
    }
  }

  getStates() {
    return this.http.get(this.port + '/getStates');
  }

  getCitiesFromStates(state) {
    console.log(this.port + '/getCitiesFromStates/' + state);
    return this.http.get(this.port + '/getCitiesFromStates/' + state);
  }

  getItemsNearMe(longitude, latitude) {
    console.log(this.port + '/getItemsNearMe?longitude=' + longitude + '&latitude=' + latitude);
    return this.http.get(this.port + '/getItemsNearMe?longitude=' + longitude + '&latitude=' + latitude);

  }

  searchItems(itemName, city, category) {
    console.log(this.port + '/searchItems?itemName=' + itemName + '&category=' + category + '&city=' + city);
    return this.http.get(this.port + '/searchItems?itemName=' + itemName + '&category=' + category + '&city=' + city);
  }
  getItemsFromCities(state, city) {
    console.log('Service called ' + this.port + '/getItemsFromCities/' + state + '/' + city);
    return this.http.get(this.port + '/getItemsFromCities/' + state + '/' + city);
  }
  savedata(data: any) {

    alert("to check token"+localStorage.getItem('token'));

    console.log(data);
    let body = JSON.stringify(data);
    return this.http.post(this.port+'/cs/createCustomer', body);


  }

  getAllcityByState(state: string, cb): any {

    this.http.get('http://localhost:3000/api/getCitiesFromStates/' + state).subscribe((data: any) => {
      this.cityresult = data
      cb(this.cityresult);
      //       
    });
    return;
  }

  getAllStates(cb): any {

    this.http.get('http://localhost:3000/api/getStates').subscribe((data: any) => {
      this.stateresult = data
      cb(this.stateresult);
      //       
    });
    return;
  }

  getSearchedItems(itemName, category, city) {
   console.log(this.port + '/searchItems?itemName=' + itemName + '&category=' + category + '&city=' + city);
    return this.http.get(this.port + '/searchItems?itemName=' + itemName + '&category=' + category + '&city=' + city);
  }
}
