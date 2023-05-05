import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExibirComponent } from './componentes/exibir/exibir.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';


@NgModule({
  declarations:[
    AppComponent,
    HomeComponent,
    MenuComponent,
    ExibirComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [ HttpClientModule ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}