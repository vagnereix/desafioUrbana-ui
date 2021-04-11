import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoService } from 'src/app/cartao.service';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/usuario/usuario';
import { Cartao } from '../cartao';

@Component({
  selector: 'app-cartao-form',
  templateUrl: './cartao-form.component.html',
  styleUrls: ['./cartao-form.component.css']
})
export class CartaoFormComponent implements OnInit {

  idUsuario!: number;
  cartao: Cartao;
  usuarios: Usuario[] = [];
  success: boolean = false;
  errors: string[] = [];
  erro!: string;
  tipos!: string[];

  constructor(
    private service: CartaoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.cartao = new Cartao();
   }

  ngOnInit(): void {
    this.service.getTipos()
      .subscribe(response => {
        this.tipos = response
      })

    this.usuarioService.getUsuarios()
      .subscribe(response => this.usuarios = response);
  }

  onSubmit(){
    if(this.idUsuario == null){
        this.errors = ['Usuário não pode ser nulo!']
    } else {
        this.service.salvar(this.idUsuario, this.cartao)
        .subscribe(
          response => {
            this.success = true;
            this.cartao = new Cartao();
            this.erro = ''
            this.errors = []
            this.router.navigate(['/cartao/lista'])
        },
          errorResponse => {
            console.log(errorResponse)
            this.errors = errorResponse.error.errors
            this.erro = errorResponse.error.message
            this.success = false;
        });
    }
  }

  voltarParaLista(){
    this.router.navigate(['/cartao']);
  }

}
