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
import { ProductDetailComponent } from "./admin-main/product-detail/product-detail.component";
import { AdminChartsComponent } from "./admin-main/admin-charts/admin-charts.component";
import { ProductSettingsComponent } from "./admin-main/product-settings/product-settings.component";
import { GetProductResolver } from "./_resolvers/product-get.resolver";

export const routes: Routes = [
    { path: '', component: FrontpageComponent },
    {path: 'shirts/:id', component:  ItemsListComponent,},
    {path: 'accessories/:id', component:  ItemsListComponent  },
    {path: 'knitt-wear/:id', component:  ItemsListComponent  },
    { path: 'product/:id', component: ItemDetailsComponent, resolve: { product: GetProductResolver } },
    { path: 'login', component: LogRegComponent },
    { path: 'admin', component: AdminpageComponent },

    {
        path: 'admin/main',
        runGuardsAndResolvers: "always",
        canActivate: [AdminAuthGuard],
        data: {
            breadcrumb: 'Admin'
        }, children: [
            {
                path: '', component: AdminMainComponent, children: [
                    {
                        path: 'details', component: ProductDetailComponent
                    }, {
                        path: 'edit/:id', component: EditProductComponent, resolve: { product: PhotoUploadResolver }, canDeactivate: [PreventUnsavedChanges]
                    }, {
                        path: 'create-product', component: CreateProductComponent
                    }, { path: '', component: AdminChartsComponent },
                    { path: 'product-settings', component: ProductSettingsComponent }
                ]
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: "full" },

];

