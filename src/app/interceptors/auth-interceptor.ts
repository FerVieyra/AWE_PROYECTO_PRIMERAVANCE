import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.getToken() ?? "";

    let clonnedReq = req;

    if(token) {
        clonnedReq = req.clone({
            setHeaders: {
                'Authorization': token
            }
        })
    }

    return next(clonnedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
                authService.logout();
            }
            return throwError(() => error);
        })
    );
}