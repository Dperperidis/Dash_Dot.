import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/_models/message';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  pagination: Pagination;
  messages: Message[];
  protected
  product: Product;
  modalRef: BsModalRef;

  constructor(private adminProdService: AdminProductService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.messages = data['product'].result;
      this.pagination = data['product'].pagination
    })
  }


  searchProduct(code, template){
this.productService.getProductByCode(code).subscribe(res => {
      this.product = res; 
      this.modalRef = this.modalService.show(template);
      if (res == null) {
        this.toastr.error('Δεν βρέθηκε προιόν με αυτόν τον κωδικό.')
      }
 
    }, error => {
      this.toastr.error("Παρακαλώ εισάγετε κωδικό προϊόντος.");
    })
  }

  getMessages(){
    this.adminProdService.getMessages(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((res : PaginatedResult<Message[]>)=>{
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error =>{
      this.toastr.error(error);
    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page
    this.getMessages();
  }

  deleteMessage(id){
    const i = this.messages.findIndex(x=>x.id == id);
    this.messages.splice(i,1);
    this.adminProdService.deleteMessage(id).subscribe(res=>{
      this.toastr.success('Η διαγραφή έγινε επιτυχώς');
    }, error=>{
      this.toastr.error(error);
    })
  }
}
