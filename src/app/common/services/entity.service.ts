import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomResponse, IEntity } from "../models/common";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class EntitySerice extends BaseService {
    constructor(protected override http: HttpClient){
        super(http);
    }

    private url = environment.url + '/entity/';

    public createFolder(name: string,userGroups:string[], parent: string){
        return this.post(this.url + "folder", {
            child: name,
            parent: parent,
            userGroups: userGroups
        });
    }

    public createFile(file: string, fileName: string,userGroups:string[], rootname: string){
        return this.post(this.url + "file", {
            file: file,
            parent: rootname,
            name: fileName,
            userGroups: userGroups
        });
    }

    public getAllEntities(rootname: string): Observable<CustomResponse<IEntity[]>>{
        return this.post(this.url, {
            parent: rootname   
        });
    }

    public getMyEntities(rootname: string): Observable<CustomResponse<IEntity[]>>{
        return this.post(this.url+'get-my-files', {
            parent: rootname   
        });
    }

    public deleteEntity(id: string) {
        return this.delete(`${this.url}`, id);
    }
}