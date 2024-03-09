import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService
    ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let modifiedRequest;
        let token = localStorage.getItem('token')

        if (token) {
            if (request.url.includes('/users') || request.url.includes('/favorite-addresses')) {

                modifiedRequest = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
            else {
                modifiedRequest = request;
            }
        } else {
            modifiedRequest = request;
        }
        return next.handle(modifiedRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                const expectedError = error.status >= 400 && error.status < 500;
                if (expectedError) {
                    this.toastr.error(error.error)
                }
                if (error.status === 401 && error.error === 'jwt expired') {
                    localStorage.clear();
                    window.location.replace('/')
                }
                return throwError(error);
            })
        );
    }
}