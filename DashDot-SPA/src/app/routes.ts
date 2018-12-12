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
import { CompanyComponent } from "./footer/company/company.component";
import { UseTermsComponent } from "./footer/use-terms/use-terms.component";
import { GdprComponent } from "./footer/gdpr/gdpr.component";
import { ContactComponent } from "./footer/contact/contact.component";
import { CustomerServiceComponent } from "./footer/customer-service/customer-service.component";
import { AuthGuard } from './_guards/auth.guard';
import { AdminOrdersComponent } from "./admin-main/admin-orders/admin-orders.component";
import { AdminOrderDetailsComponent } from "./admin-main/admin-order-details/admin-order-details.component";
import { MyOrdersComponent } from './user/my-orders/my-orders.component';

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
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: CheckoutPaymentComponent, canActivate: [AuthGuard] },
    { path: 'finalize', component: CheckoutInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'account', component: MainAccountComponent, resolve: { user: MemberEditResolver } },
    { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    { path: 'company', component: CompanyComponent },
    { path: 'terms-of-use', component: UseTermsComponent },
    { path: 'gdrp', component: GdprComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'customer-service', component: CustomerServiceComponent },
    {
        path: 'admin/main',
        runGuardsAndResolvers: "always",
        canActivate: [AdminAuthGuard],
        data: {
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
                    { path: 'user-page', component: UserPageComponent, resolve: { product: MessageListResolver }, },
                    { path: 'orders/:page/:pageSize/:status/:order', component: AdminOrdersComponent },
                    { path: 'order/:id', component: AdminOrderDetailsComponent }
                ]
            },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: "full" },

];

