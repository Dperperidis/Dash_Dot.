import { Component, OnInit } from '@angular/core';
import { Size, Color } from 'src/app/_models/product';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {
  size = new Size();
  color = new Color();

  constructor(private prodSettings: ProdSettingsService) { }

  ngOnInit() {
  }


  addColor() {
    this.prodSettings.addColor(this.color).subscribe(res => {
      console.log(res);
    })
  }

  addSize() {
    this.prodSettings.addSize(this.size).subscribe(res => {
      console.log(res);
    })

  }
}
