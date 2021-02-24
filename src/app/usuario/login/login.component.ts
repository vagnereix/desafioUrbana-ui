import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nome!: string;
  email!: string;
  senha!: string;
  errors!: string[];
  cadastrando!: boolean;
  mensagemSucesso!: string;
  
  constructor(
    private router: Router,
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.service.tentarLogar(this.email, this.senha)
        .subscribe(response => {
          const access_token = JSON.stringify(response)
          localStorage.setItem('access_token', access_token)
          this.router.navigate(['/usuario']);
        }, errorResponse => {
          this.errors = ['E-mail e/ou senha incorreto(s).']
          this.mensagemSucesso = ""
        })
  }

  preparaCadastrar(event: any){
    event.preventDefault();
    this.cadastrando = true;
    this.mensagemSucesso = "";
    this.errors = []
    this.email = "";
    this.senha = "";
    this.nome = "";
  }

  cancelaCadastro(){
    this.cadastrando = false;
    this.errors = []
    this.email = "";
    this.senha = "";
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.nome = this.nome;
    usuario.email = this.email;
    usuario.senha = this.senha;
    this.service.salvar(usuario)
      .subscribe(response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.cancelaCadastro();
        this.email = "";
        this.senha = "";
        this.errors = [];
      }, errorResponse => {
        console.log(errorResponse)
        this.errors = errorResponse.error.errors;
      })
  }

}
