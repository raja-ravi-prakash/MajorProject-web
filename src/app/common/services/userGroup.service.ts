import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomResponse, IEntity } from "../models/common";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class UserGroupService extends BaseService {
    constructor(protected override http: HttpClient){
        super(http);
    }

    private url = environment.url + '/user-group/';

    public getAllUserGroups(): Observable<CustomResponse<any>>{
        return this.post(this.url, { 
        });
    }

    public deleteUserGroup(id:string): Observable<CustomResponse<any>>{
        return this.delete(this.url+`delete/${id}`, { 
        });
    }

    public getUserGroup(id:string): Observable<CustomResponse<any>>{
        return this.post(this.url+`get/${id}`, { 
        });
    }

    public createUserGroup(userGroup:any): Observable<CustomResponse<any>>{
        return this.post(this.url+`create`, userGroup);
    }

    public updateUserGroup(userGroup:any): Observable<CustomResponse<any>>{
        return this.post(this.url+`update`, userGroup);
    }
}