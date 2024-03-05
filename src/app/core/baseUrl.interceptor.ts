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
        console.log("request : ", request);
        console.log("next : ", next);

        // Add your logic to modify the request here
        let modifiedRequest;
        let token = localStorage.getItem('token')

        if (token) {
            if (request.url.includes('/users')) {

                modifiedRequest = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
            else if (request.url.includes('/favorite-addresses')) {
                const tokenParts = token.split('.');
                // Parse the payload
                const payload = JSON.parse(atob(tokenParts[1]));
                payload.userId = 4;
                tokenParts[1] = btoa(JSON.stringify(payload));
                const newToken = tokenParts.join('.');
                modifiedRequest = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${newToken}`,
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
                // If the response is an HTTP success (e.g., 200 OK), you can handle it here
                if (event instanceof HttpResponse) {
                    // Add any specific handling for successful responses
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);

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