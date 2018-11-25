import { Component, OnInit } from '@angular/core';
import { Size, Color } from 'src/app/_models/product';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {
  size = new Size();
  colorNew = new Color();
  color: any;
  filteredColors: any[];
  colors: Color[];
  colorsTemp: Color[]
  pagination: Pagination;

  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.filteredColors = data['color'].result;
      this.colorsTemp = data['color'].result;
      this.pagination = data['color'].pagination
    })
    this.color = '#ffffff';
    this.prodSettings.getColors().subscribe(res=>{
      this.colors = res;
    })
  }

  filter(query: string) {
    this.filteredColors = query
      ? this.colors.filter(t =>
          t.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.colorsTemp;
  }



  addOrUpdateColor() {
    this.colorNew.id ? this.updateColor() : this.addColor();
  }

  getColors() {
    this.prodSettings.getColorsForAdmin(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Color[]>) => {
      this.filteredColors = res.result;
      this.colors = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error(error);
    })
  }


  addColor() {
    this.prodSettings.addColor(this.colorNew).subscribe(res => {
      this.filteredColors.splice(0, 0, res);
      this.toastr.success('Η εισαγωγή χρώματος έγινε επιτυχώς');
      this.colorNew = new Color();
    }, error => {
      this.toastr.warning(error);
    });
  }

  updateColor() {
    this.prodSettings.updateColor(this.colorNew).subscribe(res => {
      this.toastr.success("H αλλαγή έγινε επιτυχώς");
      const i = this.filteredColors.findIndex(x => x.id === this.colorNew.id);
      this.filteredColors[i] = res;
      this.colorNew = new Color();
    });
  }

  addSize() {
    this.prodSettings.addSize(this.size).subscribe(res => {
      this.toastr.success('Η εισαγωγή Μεγέθους έγινε επιτυχώς');
      this.size = new Size();
    });

  }

  deleteColor(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      const i = this.filteredColors.findIndex(x => x.id === id);
      this.prodSettings.deleteColor(id).subscribe(res => {
        this.filteredColors.splice(i, 1);
        this.toastr.success('Η διαγραφή έγινε επιτυχώς');
      });
      // tslint:disable-next-line:no-unused-expression
    } error => {
      this.toastr.error(error);
    };
  }
  editColor(i: number) {
    this.colorNew.id = this.filteredColors[i].id;
    this.colorNew.rgb = this.filteredColors[i].rgb;
    this.colorNew.title = this.filteredColors[i].title;

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getColors();

  }

}
