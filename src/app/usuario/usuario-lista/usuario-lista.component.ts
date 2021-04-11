import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  usuario!: Usuario;
  email!: string;
  usuarioLogado!: string;
  usuarioSelecionado!: Usuario;
  usuarios!: Usuario[];
  mensagemSucesso!: string;
  mensagemErro!: string;

  constructor(
    private router: Router,
    private service: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.service.getUsuarioAutenticado();
    
    this.service.getUsuarios()
      .subscribe(response => this.usuarios = response);
  }

  load(){
    location.reload();
  }

  buscarUsuario(){
    this.service.getUsuarioByEmail(this.email)
      .subscribe(response => {
        this.usuario = response
      });
  }

  verificarDelecao(us: Usuario){
    if(us.email == this.usuarioLogado){
      this.service.encerrarSessao()
      this.router.navigate(['/login'])
    }
  }

  preparaDelecao(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarCliente(){
    this.service.deletar(this.usuarioSelecionado)
    .subscribe(
      response => {
        this.verificarDelecao(this.usuarioSelecionado)
        this.mensagemSucesso = 'Usuário deletado com sucesso!'
        this.ngOnInit(); 
      },
      respondeError => this.mensagemErro = 'O usuário ainda possui cartões cadastrados em seu nome!'
    )
  }

  chamarEdicao(id: number){
    this.router.navigate([`/usuario/form/${id}`])
  }

}
