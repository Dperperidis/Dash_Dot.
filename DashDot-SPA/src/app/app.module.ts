import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from "ngx-bootstrap";
import { JwtModule } from "../../node_modules/@auth0/angular-jwt";
import { routes } from "./routes";
import {ImageZoomModule} from 'angular2-image-zoom';
import { FileUploadModule } from 'ng2-file-upload';

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
import { Routing } from './_services/routing.service';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export function tokenGetter() {
  return localStorage.getItem("token");
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
    AdminChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule,
    ReactiveFormsModule,
    ImageZoomModule,
    FileUploadModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:50274"],
        blacklistedRoutes: [
          "localhost:50274/api/auth"
        ]
      }
    })
  ],
  providers: [
    AuthService,
    Routing,
    ProductService,
    PreventUnsavedChanges,
    PhotoUploadResolver,
    ProductEditResolver,
    ErrorInterceptorProvider,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
