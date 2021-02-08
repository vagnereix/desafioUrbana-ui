import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartao } from './cartao/cartao';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  apiURL: string = environment.apiURLBase + "/api/cartao";
  apiURLSave: string = environment.apiURLBase + "/api/usuario";

  salvar(id: number, cartao: Cartao): Observable<Cartao> {
    return this.http.post<Cartao>(`${this.apiURLSave}/${id}`, cartao);
  }

  buscar(id: number): Observable<Cartao[]> {
    return this.http.get<Cartao[]>(`${this.apiURL}/${id}`);
  }

  deletar(cartaoSelecionado: Cartao): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cartaoSelecionado.numero}`);
  }

  alterarStatus(cartao: Cartao): Observable<Cartao>{
    return this.http.put<Cartao>(`${this.apiURL}/${cartao.numero}`, cartao);
  }

  constructor(
    private http: HttpClient
  ) { }

}
