import { Component, OnInit } from '@angular/core';
import { PaginationService, PagedData } from 'src/app/_services/pagination.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/_models/shoppingcart';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  pagedData = new PagedData<Order>();
  prefs: any;
  constructor(
    private pagerService: PaginationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: AdminProductService
  ) { }

  ngOnInit() {
    this.init();
    this.getOrders();
  }

  init() {
    this.pagedData.pageSize = 10;
    this.pagedData.page = 1;
    this.pagedData.order = 'lastname';
  }

  getOrders(searching: boolean = false) {
    this.spinner.show();
    this.service.getOrders(this.pagedData.page, this.pagedData.pageSize, this.pagedData.order,
      this.pagedData.status, this.pagedData.search).subscribe((res) => {
        console.log(res);
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

  setOrder(order: number) {
    // if (order === 0) {
    //   this.order = this.order === 'title' ? 'title_desc' : 'title';
    // } else {
    //   this.order = this.order === 'date' ? 'date_desc' : 'date';
    // }
    // this.getEvents();
  }

  firstPage() {
    if (this.pagedData.page === 1) {
      return;
    }
    this.pagedData.page = 1;
    this.getOrders();
  }

  lastPage() {
    if (this.pagedData.page === this.pagedData.totalPages) {
      return;
    }
    this.pagedData.page = this.pagedData.totalPages;
    this.getOrders();
  }

}
