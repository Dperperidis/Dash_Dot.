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
import { StoreMapsComponent } from "./store-maps/store-maps.component";
import { ProductListResolver } from "./_resolvers/product-list.resolver";
import { UserPageComponent } from "./admin-main/user-page/user-page.component";
import { MessageListResolver } from "./_resolvers/messages-list.resolver";
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { MainAccountComponent } from "./user/main-account/main-account.component";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { ColorListResolver } from "./_resolvers/colors-list.resolver";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { CheckoutInvoiceComponent } from "./checkout-invoice/checkout-invoice.component";

export const routes: Routes = [
    { path: '', component: FrontpageComponent },
    { path: 'shirts/:id', component: ItemsListComponent, },
    { path: 'accessories/:id', component: ItemsListComponent },
    { path: 'knitt-wear/:id', component: ItemsListComponent },
    { path: 'product/:id', component: ItemDetailsComponent, resolve: { product: GetProductResolver } },
    { path: 'login', component: LogRegComponent },
    { path: 'admin', component: AdminpageComponent },
    { path: 'stores', component: StoreMapsComponent },
    { path: 'cart', component: ShoppingcartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'payment', component: CheckoutPaymentComponent },
    { path: 'invoice', component: CheckoutInvoiceComponent },
    { path: 'account', component: MainAccountComponent, resolve: { user: MemberEditResolver } },
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
                        path: 'details', component: ProductDetailComponent, resolve: { product: ProductListResolver }
                    }, {
                        path: 'edit/:id', component: EditProductComponent, resolve: { product: PhotoUploadResolver },
                        canDeactivate: [PreventUnsavedChanges]
                    }, {
                        path: 'create-product', component: CreateProductComponent
                    }, { path: '', component: AdminChartsComponent },
                    { path: 'product-settings', component: ProductSettingsComponent, resolve: { color: ColorListResolver } },
                    { path: 'user-page', component: UserPageComponent, resolve: { product: MessageListResolver }, }
                ]
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: "full" },

];

