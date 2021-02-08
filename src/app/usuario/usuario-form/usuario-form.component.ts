import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario;
  successUpdate!: string;
  errors: string[] = [];
  id!: number;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params;

    params.subscribe(urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getUsuarioByID(this.id)
            .subscribe(
              response => this.usuario = response,
              errorResponse => this.usuario = new Usuario()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/usuario']);
  }

  onSubmit(){
      this.service.atualizarUsuario(this.usuario)
      .subscribe(
        response => {
          this.successUpdate = 'Usuário atualizado com sucesso!'
          this.errors = [];
        }, errorResponse => {
          this.successUpdate = ''
          this.errors = ['Atualização de usuario falhou!'];
        }
      )
  } 

}
