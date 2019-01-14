import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-front-modal',
  templateUrl: './front-modal.component.html',
  styleUrls: ['./front-modal.component.css']
})
export class FrontModalComponent implements OnInit {
  @Input() activate = false;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
