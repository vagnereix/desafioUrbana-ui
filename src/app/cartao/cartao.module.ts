import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoListaComponent } from './cartao-lista/cartao-lista.component';
import { FormsModule } from '@angular/forms';
import { CartaoFormComponent } from './cartao-form/cartao-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CartaoListaComponent, CartaoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CartaoListaComponent, CartaoFormComponent
  ]
})
export class CartaoModule { }
