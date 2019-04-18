import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { UserDecksComponent } from './component/user-decks/user-decks.component';
import { UserCardsComponent } from './component/user-cards/user-cards.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users/:uid', component: UserComponent, children: [
      {
        path: 'decks',
        component: UserDecksComponent,
      },
      {
        path: 'cards',
        component: UserCardsComponent,
      },
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'admins/:aid', component: AdminComponent },
  { path: 'users/:uid/decks', component: UserDecksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
