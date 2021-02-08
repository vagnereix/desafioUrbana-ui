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

  usuarioSelecionado!: Usuario;
  usuarios: Usuario[] = []
  mensagemSucesso!: string;
  mensagemErro!: string;

  constructor(
    private router: Router,
    private service: UsuarioService) { }

  ngOnInit(): void {
      this.service.getUsuarios()
        .subscribe(response => this.usuarios = response);
  }

  preparaDelecao(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarCliente(){
    this.service.deletar(this.usuarioSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Usuário deletado com sucesso!'
        this.ngOnInit();      
      },
      respondeError => this.mensagemErro = respondeError.errors.value()//'Ocorreu um erro ao deletar o cliente!'
    )
  }

  chamarEdicao(id: number){
    this.router.navigate([`/usuario/form/${id}`])
  }

}
