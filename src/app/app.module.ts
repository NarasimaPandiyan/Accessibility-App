import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { YnNComponent } from './yn-n/yn-n.component';
import { FooterComponent } from './footer/footer.component';
import { ConvoComponent } from './convo/convo.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    YnNComponent,
    FooterComponent,
    ConvoComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
