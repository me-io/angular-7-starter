import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authHeader = req.headers.get('Authorization');
    let authReq = req;

    if (!authHeader) {
      // console.log('intercepted request ... ');
      authHeader = this.getAuthorizationHeader();
      // Clone the request to add the new header.
      if (authHeader) {
        authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });
      }
      // console.log('Sending request with new header now ...');
    }

    // send the newly created request
    return next.handle(authReq);
  }
}

