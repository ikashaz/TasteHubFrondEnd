import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LogoutComponent } from './logout/logout.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { OrderListComponent } from './order-list/order-list.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    FeaturedProductsComponent,
    CategoriesComponent,
    TestimonialsComponent,
    FooterComponent,
    HomeComponent,
    AddProductComponent,
    ProductListComponent,
    CartComponent,
    LogoutComponent,
    ProductSearchComponent,
    OrderComponent,
    CheckoutComponent,
    TrackOrderComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterailModule,
    MatIconModule,
    HttpClientModule, //for call backend api
    MatToolbarModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
