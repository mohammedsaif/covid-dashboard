import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Countries } from "../models/countries.model";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private readonly countrySource = new Subject<any>();
    countryList = this.countrySource.asObservable();
    private readonly selectedCountrySrc = new Subject<any>();
    selectedCountry = this.selectedCountrySrc.asObservable();
    private readonly selectedCountryHistroy = new Subject<any>();
    selectedHistory = this.selectedCountryHistroy.asObservable();
    private readonly showSpinner = new BehaviorSubject(null);
    showSpinnerMessage = this.showSpinner.asObservable();

    setCountryData(countryData: Countries): any {
        this.countrySource.next(countryData);
    }
    setSelectedCountry(data: any) {
        this.selectedCountrySrc.next(data);
    }
    setHistoricalData(data: any) {
        this.selectedCountryHistroy.next(data)
    }
    displaySpinner(showSpinnerFlag: any): void {
        this.showSpinner.next(showSpinnerFlag);
    }
}