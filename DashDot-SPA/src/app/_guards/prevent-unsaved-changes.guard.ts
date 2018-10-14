import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EditProductComponent } from "../admin-main/edit-product/edit-product.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditProductComponent> {

  canDeactivate(component: EditProductComponent) {
    if (component.editForm.dirty) {
      return confirm(
        "Είστε σίγουρος/η οτι θέλετε να συνεχίσετε; Όλες οι αλλαγές πρόκειται να χαθούν!"
      );
    } else {
      return true;
    }
  }
}
