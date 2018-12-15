import { Component, OnInit } from '@angular/core';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { Message } from 'src/app/_models/message';
import { PagedData } from 'src/app/_services/pagination.service';
import { Order } from 'src/app/_models/shoppingcart';
import { getHours } from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {
  messages: Message[];
  orders = [];
  date = new Date;
  pagedData = new PagedData<Order>();

  constructor(private adminProd: AdminProductService) { }

  ngOnInit() {
    this.adminProd.getMessagesForAdmin().subscribe(res => {
      this.messages = res.filter(x => new Date(x.created).getDay() >= this.date.getDay());
    });
    this.adminProd.getOrderForAdmin().subscribe(res => {
      this.orders = res;
    });
  }
}
