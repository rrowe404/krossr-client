import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // todo remove hacky fix for allowing openapi calls and httpclient calls to coexist...
        if (req.url.indexOf('api') > -1) {
            return next.handle(req);
        }

        const base = 'api/';

        req = req.clone({
            url: base + req.url
        });

        return next.handle(req);
    }
}
