import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CardDetailComponent } from './component/card-detail/card-detail.component';
import { UserDecksComponent } from './component/user-decks/user-decks.component';
import { UserCardsComponent } from './component/user-cards/user-cards.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
import { DeckListComponent } from './component/deck-list/deck-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    CardDetailComponent,
    UserDecksComponent,
    UserCardsComponent,
    DeckDetailComponent,
    DeckListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
