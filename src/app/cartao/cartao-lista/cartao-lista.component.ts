import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoService } from 'src/app/cartao.service';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/usuario/usuario';
import { Cartao } from '../cartao';

@Component({
  selector: 'app-cartao-lista',
  templateUrl: './cartao-lista.component.html',
  styleUrls: ['./cartao-lista.component.css']
})
export class CartaoListaComponent implements OnInit {

  cartaoSelecionado!: Cartao;
  idUsuario!: number;
  cartoes: Cartao[] = [];
  usuarios: Usuario[] = [];
  mensagemSucesso!: string;
  message!: string;
  mensagemErro!: string;

  constructor(
    private service: CartaoService,
    private usuarioService: UsuarioService,
    private route: Router
  ) { }

  load(){
    location.reload();
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
      .subscribe(response => this.usuarios = response);
  }

  cadastrarCartao(){
    this.route.navigate(['/cartao/form'])
  }

  preparaDelecao(cartao: Cartao){
    this.cartaoSelecionado = cartao;
  }

  deletarCartao(){
    this.service.deletar(this.cartaoSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Cartão deletado com sucesso!'
          this.consultar()
        }, responseError => this.mensagemErro = 'O pôde ser deletado!'
      )
  }

  consultar(){
    this.service.buscar(this.idUsuario)
    .subscribe(response => {
      this.cartoes = response
      if(this.cartoes.length <= 0){
        this.message = 'Nenhum cartão encontrado para este usuário!'
        this.mensagemSucesso = ''
        this.mensagemErro = ''
      } else {
        this.message = ''
      }
    })
  }

  alterarStatus(cartao: Cartao){
    this.service.alterarStatus(cartao)
    .subscribe(
      response => {
        this.mensagemSucesso = "Status alterado!"
        this.mensagemErro = ""
        this.message = ""
        this.consultar()
      }, errorResponse => {
        this.message = ""
        this.mensagemSucesso = ""
        this.mensagemErro = "Status não atualizado!"
      }
    )
  }

}
