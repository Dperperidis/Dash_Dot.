import { Routes } from "@angular/router";
import { FrontpageComponent } from "./frontpage/frontpage.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { LogRegComponent } from "./log-reg/log-reg.component";
import { AdminpageComponent } from "./adminpage/adminpage.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { PhotoUploadResolver } from "./_resolvers/photo-upload.resolver";
import { EditProductComponent } from "./admin-main/edit-product/edit-product.component";
import { AdminAuthGuard } from "./_guards/admin-auth-guard.service";
import { CreateProductComponent } from "./admin-main/create-product/create-product.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";

export const routes: Routes = [
    { path: '', component: FrontpageComponent },
    { path: 'andrika-poukamisa/slimfit', component: ItemsListComponent },
    { path: 'slimfit/details/:id', component: ItemDetailsComponent,resolve: { product: PhotoUploadResolver } },
    { path: 'login', component: LogRegComponent },
    { path: 'admin', component: AdminpageComponent },
    

    {
        path: '',
        runGuardsAndResolvers: "always",
        canActivate: [AdminAuthGuard],
        children: [
            { path: 'admin/create-product', component: CreateProductComponent},
            { path: 'admin/edit/:id', component: EditProductComponent, resolve: { product: PhotoUploadResolver }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'admin/main', component: AdminMainComponent },
            { path: 'admin/details', component: AdminMainComponent },
            
        ]
    },

    { path: '**', redirectTo: '', pathMatch: "full" },

];
