import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule, PaginationModule } from "ngx-bootstrap";
import { JwtModule } from "../../node_modules/@auth0/angular-jwt";
import { routes } from "./routes";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BreadcrumbsModule } from "ng6-breadcrumbs";
import { ModalModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FileUploadModule } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageZoomModule } from 'angular2-image-zoom';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { FooterComponent } from './footer/footer.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { AuthService } from './_services/auth.service';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CreateProductComponent } from './admin-main/create-product/create-product.component';
import { EditProductComponent } from './admin-main/edit-product/edit-product.component';
import { PhotoEditorComponent } from './admin-main/photo-editor/photo-editor.component';
import { ProductService } from './_services/product.service';
import { AdminNavbarComponent } from './admin-main/admin-navbar/admin-navbar.component';
import { AdminCardsComponent } from './admin-main/admin-cards/admin-cards.component';
import { PhotoUploadResolver } from './_resolvers/photo-upload.resolver';
import { ProductEditResolver } from './_resolvers/product-edit.resolver';
import { ErrorInterceptorProvider } from './_resolvers/error.interceptor';
import { ProductDetailComponent } from './admin-main/product-detail/product-detail.component';
import { AdminAuthGuard } from './_guards/admin-auth-guard.service';
import { AdminChartsComponent } from './admin-main/admin-charts/admin-charts.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ProductSettingsComponent } from './admin-main/product-settings/product-settings.component';
import { ProdSettingsService } from './_services/prodsettings.service';
import { GetProductResolver } from './_resolvers/product-get.resolver';
import { AdminProductService } from './_services/adminproduct.service';
import { StoreMapsComponent } from './store-maps/store-maps.component';
import { registerLocaleData } from '@angular/common';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { UserPageComponent } from './admin-main/user-page/user-page.component';
import { MessageListResolver } from './_resolvers/messages-list.resolver';
import { ShoppingCartService } from './_services/shopping-cart.service';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { MainAccountComponent } from './user/main-account/main-account.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { ColorListResolver } from './_resolvers/colors-list.resolver';
import { LocalStorageService } from './_services/localstorage.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutStepsComponent } from './checkout-steps/checkout-steps.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutInvoiceComponent } from './checkout-invoice/checkout-invoice.component';
import { CompanyComponent } from './footer/company/company.component';
import { UseTermsComponent } from './footer/use-terms/use-terms.component';
import { GdprComponent } from './footer/gdpr/gdpr.component';
import { ContactComponent } from './footer/contact/contact.component';
import { CustomerServiceComponent } from './footer/customer-service/customer-service.component';
import { AuthGuard } from './_guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_resolvers/auth.interceptor';
import { AdminOrdersComponent } from './admin-main/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './admin-main/admin-order-details/admin-order-details.component';
import { PaginationService } from './_services/pagination.service';

registerLocaleData(localeDe);
export function tokenGetter() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token');
    }
  }
}




@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    NavbarComponent,
    ItemsListComponent,
    FooterComponent,
    ItemDetailsComponent,
    LogRegComponent,
    AdminpageComponent,
    AdminMainComponent,
    CreateProductComponent,
    EditProductComponent,
    PhotoEditorComponent,
    AdminNavbarComponent,
    AdminCardsComponent,
    ProductDetailComponent,
    AdminChartsComponent,
    ProductSettingsComponent,
    StoreMapsComponent,
    UserPageComponent,
    ShoppingcartComponent,
    MainAccountComponent,
    CheckoutComponent,
    CheckoutStepsComponent,
    CheckoutPaymentComponent,
    CheckoutInvoiceComponent,
    CompanyComponent,
    UseTermsComponent,
    GdprComponent,
    ContactComponent,
    CustomerServiceComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule,
    ImageZoomModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ColorPickerModule,
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    CarouselModule.forRoot(),
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjQ0-_ZDIeusY968G40BkJen-adCm3yWI'
    }),
    CollapseModule.forRoot(),
    ChartsModule,
    BreadcrumbsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:51119"],
        blacklistedRoutes: [
          "localhost:51119/api/auth"
        ]
      }
    })
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-DE'
  },
    AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    ProductService,
    PreventUnsavedChanges,
    AuthGuard,
    PhotoUploadResolver,
    ProductEditResolver,
    ErrorInterceptorProvider,
    GetProductResolver,
    AdminAuthGuard,
    LocalStorageService,
    AdminProductService,
    ProdSettingsService,
    ShoppingCartService,
    PaginationService,
    ProductListResolver,
    MessageListResolver,
    MemberEditResolver,
    ColorListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
