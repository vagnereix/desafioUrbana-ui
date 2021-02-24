import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//npm-install @auth0/angular-jwt
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURLSave: string = environment.apiURLBase + "/api";
  apiURL: string = environment.apiURLBase + "/api/usuario";
  apiURLEmail: string = environment.apiURLBase + "/api/usuario/email";

  tokenURL: string = environment.apiURLBase + environment.obterTokenURL
  clientID: string = environment.clientID
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient) { }

  tentarLogar(email: string, senha: string): Observable<any>{
    const params = new HttpParams()
                        .set('username', email)
                        .set('password', senha)
                        .set('grant_type', 'password')
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post<any>(this.tokenURL, params.toString(), {headers})
  }

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken()
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name //pegando user do token
      return usuario
    } else {
      return null
    }
  }

  isAuthenticaded(): boolean{
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token) //true se expirado, false se não
      return !expired //contrário do retorno hur dur
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(this.apiURLSave, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL) 
  }

  getUsuarioByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }

  atualizarUsuario(usuario: Usuario): Observable<any>{
    return this.http.put<Usuario>(`${this.apiURL}/${usuario.id}`, usuario);
  }

  deletar(usuario: Usuario): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${usuario.id}`);
  }

  getUsuarioByEmail(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiURLEmail}/${email}`);
  }
  
}
