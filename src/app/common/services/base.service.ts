import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { CustomResponse } from '../models/common';

const httpOptions = {
    headers: new HttpHeaders()
};

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(protected http: HttpClient){}

    public get<T>(url: string, requestBody?: any): Observable<CustomResponse<T>>{
        return this.http.get<CustomResponse<T>>(url, {
            headers: httpOptions.headers,
            params: requestBody
        });
    }

    public post<T>(url: string, requestBody?: any): Observable<CustomResponse<T>>{
        return this.http.post<CustomResponse<T>>(url, requestBody, {
            headers: httpOptions.headers
        });
    }

    public put<T>(url: string, requestBody?: any): Observable<CustomResponse<T>>{
        return this.http.put<CustomResponse<T>>(url, requestBody, {
            headers: httpOptions.headers,
        });
    }

    public delete<T>(url: string, requestBody?: any): Observable<CustomResponse<T>>{
        return this.http.delete<CustomResponse<T>>(url, {
            headers: httpOptions.headers,
            params: {
                id: requestBody
            }
        });
    }
}