import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MembersComponent } from './members/members.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AuthGuard } from './auth.guard';
import { DeleteComponent } from './delete/delete.component';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-event',
    component: CreateEventComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'account-page',
    component: AccountPageComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'delete',
    component: DeleteComponent
  }

    ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
