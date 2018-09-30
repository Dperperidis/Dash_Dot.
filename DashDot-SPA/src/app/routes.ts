import { Routes } from "@angular/router";
import { FrontpageComponent } from "./frontpage/frontpage.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";

export const routes: Routes = [
    { path: '', component: FrontpageComponent},
    { path: 'andrika-poukamisa/slimfit', component: ItemsListComponent},
    { path: 'slimfit/details', component: ItemDetailsComponent}
];
