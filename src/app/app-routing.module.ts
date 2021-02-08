import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { CartaoFormComponent } from './cartao/cartao-form/cartao-form.component';
import { CartaoListaComponent } from './cartao/cartao-lista/cartao-lista.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './usuario/login/login.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/usuario/lista', pathMatch: 'full'},
  {path: 'usuario',  component: LayoutComponent, 
  canActivate: [AuthenticationGuard], children: [
    {path: 'lista', component: UsuarioListaComponent},
    {path: 'form/:id', component: UsuarioFormComponent},
    {path: '', redirectTo: '/usuario/lista', pathMatch: 'full'}
]},
  {path: 'cartao',  component: LayoutComponent, 
    canActivate: [AuthenticationGuard], children: [
      {path: 'lista', component: CartaoListaComponent},
      {path: 'form', component: CartaoFormComponent},
      {path: '', redirectTo: '/cartao/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
