import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { Order } from 'src/app/_models/shoppingcart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  order: Order;
  constructor(
    private route: ActivatedRoute,
    private service: AdminProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getOrder(params['id']);
      }
    });
  }

  getOrder(id: string) {
    this.service.getOrder(id).subscribe(res => {
      console.log(res);
      this.order = res;
    }, error => {

    });
  }

  styleForOrderStatus(s: number) {
    switch (s) {
      case 0:
        return 'badge-warning';
      case 1:
        return 'badge-success';
      case 2:
        return 'badge-info';
      case 3:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  getOrderStatus(s: number) {
    switch (s) {
      case 0:
        return 'Σε εξέλιξη';
      case 1:
        return 'Ολοκληρωμένο';
      case 2:
        return 'Απεστελμένο';
      case 3:
        return 'Ακυρωμένο';
      default:
        return 'Αγνωστο';
    }
  }

}
