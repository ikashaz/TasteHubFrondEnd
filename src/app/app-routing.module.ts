import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { TrackOrderComponent } from './track-order/track-order.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "search",component:ProductSearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: FeaturedProductsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  {path: "login",component:LoginComponent},
  {path: "logout",component:LogoutComponent},
  { path: 'checkout', component: CheckoutComponent  },
  { path: 'track-order', component: TrackOrderComponent  },
  { path: 'order', component: OrderListComponent  },
  {path: "signup",component:SignupComponent},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }, 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
