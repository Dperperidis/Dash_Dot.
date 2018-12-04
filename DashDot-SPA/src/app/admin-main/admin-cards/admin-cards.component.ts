import { Component, OnInit } from '@angular/core';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {
  messages: Message[];
  date = new Date;

  constructor(private adminProd: AdminProductService) { }

  ngOnInit() {
    this.adminProd.getMessagesForAdmin().subscribe(res => {
      this.messages = res.filter(x => new Date(x.created).getDay() <= this.date.getDay());
    });
   
  }
}
