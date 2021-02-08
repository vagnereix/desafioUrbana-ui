import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  //intercepta toda requisição http e seta os headers necessários para autenticação
  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token')

    const url = request.url

    if(tokenString && !url.endsWith('/oauth/token')){
      const token = JSON.parse(tokenString)
      const tokenJWT = token.access_token
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenJWT
        }
      })
    }
    
    return next.handle(request);
  }
}
