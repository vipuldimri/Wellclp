import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'location',
    loadChildren: () => import('../location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('../product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'my-prescription',
    loadChildren: () => import('../my-prescription/my-prescription.module').then( m => m.MyPrescriptionPageModule)
  },
  {
    path: 'products-list',
    loadChildren: () => import('../products-list/products-list.module').then( m => m.ProductsListPageModule)
  },
  {
    path: 'my-cart',
    loadChildren: () => import('../my-cart/my-cart.module').then( m => m.MyCartPageModule)
  },
  {
    path: 'upload-prescription',
    loadChildren: () => import('../upload-prescription/upload-prescription.module').then( m => m.UploadPrescriptionPageModule)
  },
  {
    path: 'tabs',
    component: MainPage,
    children: [
       {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'my-orders',
        loadChildren: () => import('../my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
      },
      {
        path: 'my-address',
        loadChildren: () => import('../my-address/my-address.module').then( m => m.MyAddressPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'product-search',
        loadChildren: () => import('../product-search/product-search.module').then( m => m.ProductSearchPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
