import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { END_POINTS } from "./end-point";

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    constructor(private readonly api: ApiService) { }
    getCountries(): Observable<any> {
        const url = END_POINTS.GET_COUNTRIES;
        return this.api.get(url);
    }
    getCountriesStats(): Observable<any> {
        const url = END_POINTS.GET_STATISTICS;
        return this.api.get(url);
    }
    getCountryStatsByName(countryName: string): Observable<any> {
        const url = `${END_POINTS.GET_STATISTICS}?country=${countryName}`;
        return this.api.get(url);
    }
    getCountriesHistory(_data?: any): Observable<any> {
        const data = _data?.country ? _data?.country : `all`;
        const url = `${END_POINTS.GET_HISTORY}?country=${data}`;
        return this.api.get(url);
    }
    getCountriesLatLong(): Observable<any> {
        const url = "assets/data/geoData.json";
        return this.api.get(url);
    }
}