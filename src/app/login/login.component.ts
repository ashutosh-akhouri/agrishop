import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {'email':'', 'password':''};
  response;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onLogin(){
       this.data.checkLogin(this.user).subscribe(res => {
          this.response = res;
       })
  }

}
