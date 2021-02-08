import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado!: string;

  constructor(
    private router: Router,
    private service: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.service.getUsuarioAutenticado();
  }

  logout(){
    this.service.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
