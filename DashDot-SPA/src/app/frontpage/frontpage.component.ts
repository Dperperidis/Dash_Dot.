import { Component, OnInit, ElementRef, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";



@Component({
  selector: "app-frontpage",
  templateUrl: "./frontpage.component.html",
  styleUrls: ["./frontpage.component.css"],
  // animations: [
  //   trigger('scrollAnimation', [
  //     state('show', style({
  //       opacity: 1,
  //       transform: "translateX(0)"
  //     })),
  //     state('hide', style({
  //       opacity: 0,
  //       transform: "translateX(-100%)"
  //     })),
  //     transition('show => hide', animate('700ms ease-out')),
  //     transition('hide => show', animate('700ms ease-in'))
  //   ]),
  // ],

})
export class FrontpageComponent implements OnInit {


  // state = 'hide'

  constructor(public el: ElementRef) { }

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   const componentPosition = this.el.nativeElement.offsetTop
  //   const scrollPosition = window.pageYOffset

  //   if (scrollPosition >= componentPosition) {
  //     this.state = 'show'
  //   } else {
  //     this.state = 'hide'
  //   }

  // }

  ngOnInit() {

  }

}
