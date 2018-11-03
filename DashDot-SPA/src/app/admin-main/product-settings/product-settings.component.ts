import { Component, OnInit } from '@angular/core';
import { Size, Color } from 'src/app/_models/product';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {
  size = new Size();
  colorNew = new Color();
  color: any;
  totalColors: Color[];

  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.prodSettings.getColors().subscribe(res => {
      this.totalColors = res;
      console.log(this.colorNew.id)
    })
    this.color = '#ffffff'
  }


  addOrUpdateColor() {
    this.colorNew.id ? this.updateColor() : this.addColor();
  }


  addColor() {
    this.prodSettings.addColor(this.colorNew).subscribe(res => {
      this.totalColors.splice(0, 0, res)
      this.toastr.success('Η εισαγωγή χρώματος έγινε επιτυχώς')
      this.colorNew = new Color();
    }, error => {
      this.toastr.warning(error);
    })
  }

  updateColor() {
    this.prodSettings.updateColor(this.colorNew).subscribe(res => {
      this.toastr.success("H αλλαγή έγινε επιτυχώς");
      const i = this.totalColors.findIndex(x => x.id === this.colorNew.id);
      this.totalColors[i] = res;
      this.colorNew = new Color();
    })
  }

  addSize() {
    this.prodSettings.addSize(this.size).subscribe(res => {
      this.toastr.success('Η εισαγωγή Μεγέθους έγινε επιτυχώς')
      this.size = new Size();
    })

  }

  deleteColor(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      const i = this.totalColors.findIndex(x => x.id == id)
      this.prodSettings.deleteColor(id).subscribe(res => {
        this.totalColors.splice(i, 1);
        this.toastr.success('Η διαγραφή έγινε επιτυχώς');
      });
    } error => {
      this.toastr.error(error)
    }
  }
  editColor(i: number) {
    this.colorNew.id = this.totalColors[i].id;
    this.colorNew.rgb = this.totalColors[i].rgb;
    this.colorNew.title = this.totalColors[i].title;

  }

}
