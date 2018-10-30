import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { ProductService } from '../_services/product.service';

import { Routing } from '../_services/routing.service';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit {
  photoUrl: string;
  public isCollapsed = false;



  constructor(private authService: AuthService) {
    document.body.style.backgroundImage="url('')";

  }


  ngOnInit() {

  }



}

