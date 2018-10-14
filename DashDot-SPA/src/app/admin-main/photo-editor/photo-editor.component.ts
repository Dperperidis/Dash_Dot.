import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/photo';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Input() photos: Photo[];
  @Output() getProductPhotoChange = new EventEmitter<string>();
  product: Product;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentMain: Photo;


  constructor(private productService: ProductService, private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "products/" + this.productService.currentProduct.id + "/photos",
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain
        };
        this.photos.push(photo);
      };
    }
  }

  setMainPhoto(photo: Photo) {
    this.productService.setMainPhoto(this.productService.currentProduct.id, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.getProductPhotoChange.emit(photo.url);
    }, error => {
      this.toastr.error(error);
    })
  }

  deletePhoto(id: number) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε την φωτογραφία;")) {
      this.productService.deletePhoto(this.productService.currentProduct.id, id).subscribe(res => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.toastr.success("H Φωτογραφία διαγράφηκε!")
      }, error => {
        this.toastr.error('Η φωτογραφία δεν μπόρεσε να σβηστεί');
      })
    }
  }
}
