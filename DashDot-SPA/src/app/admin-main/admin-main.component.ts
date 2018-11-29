import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit {
  photoUrl: string;
  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;



  constructor(private authService: AuthService) {
  }


  ngOnInit() {
  }



}

