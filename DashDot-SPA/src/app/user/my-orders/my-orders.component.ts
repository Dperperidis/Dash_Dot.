import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationService, PagedData } from 'src/app/_services/pagination.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderStatus } from 'src/app/_models/shoppingcart';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private sub: any;
  pagedData = new PagedData<Order>();
  prefs: any;
  orderStatus: any;
  constructor(
    private pagerService: PaginationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: AdminProductService,
    private location: Location, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.init();
    this.getOrders();
  }

  init() {
    this.orderStatus = this.pagerService.parseEnum(OrderStatus);
    this.sub = this.route.params.subscribe(params => {
      if (params) {
        this.pagedData.pageSize = +params['pageSize'];
        this.pagedData.page = +params['page'];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOrders(searching: boolean = false) {
    this.spinner.show();
    this.service.getUserOrders(this.pagedData.page, this.pagedData.pageSize).subscribe((res) => {
      this.setUrl();
      this.pagedData = res;
      this.pagedData.page = searching ? 1 : this.pagedData.page;
      this.pagedData.totalPages = Math.ceil(res.totalRows / this.pagedData.pageSize);
      this.pagedData.pages = this.pagerService.getPages(this.pagedData.totalPages, this.pagedData.page);
      this.pagedData.search = '';
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    });
  }

  setUrl() {
    this.location.go(`/orders/${this.pagedData.page}/${this.pagedData.pageSize}`);
  }

  setPage(p: number) {
    if (p === this.pagedData.page) {
      return;
    }
    this.pagedData.page = p;
    this.getOrders();
  }

  nextPage() {
    if (this.pagedData.page === this.pagedData.totalPages) {
      return;
    }
    this.pagedData.page += 1;
    this.getOrders();
  }

  previousPage() {
    if (this.pagedData.page === 1) {
      return;
    }
    this.pagedData.page -= 1;
    this.getOrders();
  }

  firstPage() {
    if (this.pagedData.page === 1) {
      return;
    }
    this.pagedData.page = 1;
    this.getOrders();
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

  getTotalItems(o: Order) {
    return o.orderItems.length;
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

  lastPage() {
    if (this.pagedData.page === this.pagedData.totalPages) {
      return;
    }
    this.pagedData.page = this.pagedData.totalPages;
    this.getOrders();
  }
}
