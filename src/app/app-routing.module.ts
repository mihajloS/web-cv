import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitStageComponent } from './init-stage/init-stage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PublicChatComponent } from './public-chat/public-chat.component';

const routes: Routes = [
  {path: "", component: InitStageComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "public-chat", component: PublicChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
