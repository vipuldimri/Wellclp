import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/skipslides-guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'intro-slides',
    loadChildren: () => import('./intro-slides/intro-slides.module')
    .then( m => m.IntroSlidesPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'upload-prescription',
    loadChildren: () => import('./upload-prescription/upload-prescription.module').then( m => m.UploadPrescriptionPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'products-list',
    loadChildren: () => import('./products-list/products-list.module').then( m => m.ProductsListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
