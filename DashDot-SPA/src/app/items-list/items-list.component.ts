import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  private subscriptions = new Array<Subscription>();
  isAdmin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscriptions.push(this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }));

  }
} 