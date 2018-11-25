import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Message } from 'src/app/_models/message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = new Message();

  constructor(private productService: ProductService, private toastr:ToastrService) { }

  ngOnInit() {
  }


  saveMessage(){
    this.productService.saveMessage(this.message).subscribe(res=>{
      this.toastr.show('Το μήνυμα στάλθηκε επιτυχώς');
      this.message = new Message();
    }, error =>{
      this.toastr.error(error);
    })
  }
}
