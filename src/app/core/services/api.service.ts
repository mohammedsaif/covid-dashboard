import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "4886091fdcmsha10dda2662a2f9fp1982b7jsn51f407bcc295"
        })
    };
    constructor(private http: HttpClient) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }
    private parseResponse<T>(response: T): T {
        return response;
    }

    public get<T>(path: string): Observable<T> {
        const appendOptions = {};
        return this.http.get<T>(path, this.httpOptions).pipe(
            map(this.parseResponse),
            catchError(this.formatErrors)
        );
    }
    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(path, JSON.stringify(body), this.httpOptions)
            .pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http
            .post(path, JSON.stringify(body), this.httpOptions)
            .pipe(catchError(this.formatErrors));
    }

    delete(path: any): Observable<any> {
        return this.http.delete(path).pipe(catchError(this.formatErrors));
    }
}