import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainPageComponent
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
  }

    ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
