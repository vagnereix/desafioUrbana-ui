import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [UsuarioListaComponent, UsuarioFormComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UsuarioListaComponent, UsuarioFormComponent, LoginComponent
  ]
})
export class UsuarioModule { }
