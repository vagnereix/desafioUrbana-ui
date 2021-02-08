import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UsuarioModule } from './usuario/usuario.module';
import { CartaoModule } from './cartao/cartao.module';
import { CartaoService } from './cartao.service';
import { UsuarioService } from './usuario.service';
import { TokenInterceptor } from './token.interceptor';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TemplateModule,
    UsuarioModule,
    CartaoModule
  ],
  providers: [
    CartaoService,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
