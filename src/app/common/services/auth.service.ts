import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomResponse, IEntity, ISession, IUser } from "../models/common";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    constructor(protected override http: HttpClient){
        super(http);
    }

    private url = environment.url + '/auth/';

    public login(username: string, password: string): Observable<CustomResponse<{token: ISession, rootEntity: IEntity}>>{
        return this.post<{token: ISession, rootEntity: IEntity}>(this.url + "login", {
            username: username,
            password: password
        });
    }

    public register(userDetails: IUser): Observable<CustomResponse<any[]>>{
        return this.post(this.url + "register", userDetails);
    }
}