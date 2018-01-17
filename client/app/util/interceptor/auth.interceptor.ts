import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  getAuthorizationHeader() {
    const token = localStorage.getItem('token');
    return token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');
    const authHeader = this.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });

    console.log('Sending request with new header now ...');

    // send the newly created request
    return next.handle(authReq)
      .catch((error, caught) => {
        // intercept the respons error and displace it to the console
        console.log('Error Occurred');
        console.log(error);
        // return the error to the method that called it
        return Observable.throw(error);
      }) as any;
  }
}

