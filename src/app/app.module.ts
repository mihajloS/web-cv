import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InitStageComponent } from './init-stage/init-stage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from "@angular/common/http";
import { PublicChatComponent } from './public-chat/public-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    InitStageComponent,
    AboutComponent,
    ContactComponent,
    PublicChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
