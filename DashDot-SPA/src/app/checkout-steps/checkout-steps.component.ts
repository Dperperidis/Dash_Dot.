import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-steps',
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.css']
})
export class CheckoutStepsComponent implements OnInit {
  @Input() step = 0;
  @Input() percent = 25;
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

}
