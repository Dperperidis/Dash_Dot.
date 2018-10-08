import { Routes } from "@angular/router";
import { FrontpageComponent } from "./frontpage/frontpage.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { LogRegComponent } from "./log-reg/log-reg.component";
import { AdminpageComponent } from "./adminpage/adminpage.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { CreateProductComponent } from "./admin-main/create-product/create-product.component";

export const routes: Routes = [
    { path: '', component: FrontpageComponent},
    { path: 'andrika-poukamisa/slimfit', component: ItemsListComponent},
    { path: 'slimfit/details', component: ItemDetailsComponent},
    { path: 'login', component: LogRegComponent},
    { path: 'admin', component: AdminpageComponent},
    { path: 'admin/main', component: AdminMainComponent},

    { path: '**', redirectTo: ''},

];
