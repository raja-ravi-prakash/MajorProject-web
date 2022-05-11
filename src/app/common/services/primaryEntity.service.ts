import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomResponse, IEntity, IPrimaryEntity } from "../models/common";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class PrimaryEntitySerice extends BaseService {
    constructor(protected override http: HttpClient){
        super(http);
    }

    private url = environment.url + '/primary-entity/';

    public getAllEntities(): Observable<CustomResponse<IPrimaryEntity[]>>{
        return this.post(this.url, {});
    }

    public deleteEntity(id: string) {
        return this.delete(`${this.url}`, id);
    }

    public getEntitiesByPrimaryEntity(id: string): Observable<CustomResponse<IEntity[]>>{
        return this.post(this.url + 'entity', {
            primaryEntity: id
        });
    }
}