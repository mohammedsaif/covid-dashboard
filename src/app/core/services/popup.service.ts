import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class PopUpService {
    constructor() { }

    makeCapitalPopup(data: any): string {
        return `` +
            `<div>Country: ${data?.country}</div>` +
            `<div>Active cases: ${data?.cases?.active}</div>` +
            `<div>New cases: ${data?.cases?.new}</div>` +
            `<div>critical cases: ${data?.cases?.critical}</div>` +
            `<div>Population: ${data?.population}</div>`
    }
}