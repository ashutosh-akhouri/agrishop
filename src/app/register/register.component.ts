import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = {'name':'ABCD', 'email':'', 'password':'', 'promotionOpted':true};

  constructor() { }

  ngOnInit() {
  }

  onRegister(){
    // backend interaction - Data Service - Backend - DB
    alert("JSON.stringify(this.newUser)");
  }

}
