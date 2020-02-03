import { Component, OnInit } from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  newUser = {'name':'ABCD', 'email':'', 'password':'', 'promotionOpted':true};

  constructor(private data:DataService) { }

  ngOnInit() {
  }

  onRegister(){
    // backend interaction - Data Service - Backend - DB
    alert(JSON.stringify(this.newUser));
    this.data.saveNewUser(this.newUser).subscribe(res => {
        console.log(JSON.stringify(res));
    });
    
  }

}
