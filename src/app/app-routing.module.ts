import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NeedAuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NeedAuthGuard] // <---- connected Route with guard
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [

  ],
})
export class AppRoutingModule { }
