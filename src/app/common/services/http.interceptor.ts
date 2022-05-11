import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { environment } from "src/environments/environment";
import { CryptoHelper } from "./crypto.service";
import LoadingService from '../services/loading.service';

export class RequestInterceptor implements HttpInterceptor{
    private cryptohelper = new CryptoHelper(environment.salt, environment.secretKey, environment.iv);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        LoadingService.show();
        let parsedBody: any = JSON.stringify(req.body);
        let payload = this.cryptohelper.encrypt(parsedBody)
        let customRequestBody = req.clone({
            body: {
                encryptedPayload: payload,
                sessionId: sessionStorage.getItem('token')
            }
        });
        return next.handle(customRequestBody).pipe(
            finalize(()=>{
                LoadingService.hide();
            })
        );;
    }
}