import { Injectable } from "@angular/core";
import * as L from 'leaflet';
import { PopUpService } from "./popup.service";
@Injectable({
    providedIn: 'root',
})
export class MarkerService {

    static scaledRadius(val: number, maxVal: number): number {
        return 80 * (val / maxVal);
    }
    constructor(private popupService: PopUpService) { }


    makeCapitalCircleMarkers(map: L.Map | L.LayerGroup<any>, data: any): void {
        const maxActive = Math.max(...data?.map((x: any) => x?.cases?.active), 0);
        for (const c of data) {
            const circle = L.circleMarker(c?.latlng ? c?.latlng : [0, 0], {
                radius: MarkerService.scaledRadius(c?.cases?.active, maxActive)
            });

            circle.setStyle({ color: 'blue' });
            circle.bindPopup(this.popupService.makeCapitalPopup(c));
            circle.addTo(map);
        }
    }
    makeCapitalCircleDeathMarkers(map: L.Map | L.LayerGroup<any>, data: any): void {
        const maxDeath = Math.max(...data?.map((x: any) => x?.deaths?.total), 0);

        for (const c of data) {
            const circle2 = L.circleMarker(c?.latlng ? c?.latlng : [0, 0], {
                radius: MarkerService.scaledRadius(c?.deaths?.death, maxDeath)
            });
            circle2.setStyle({ color: 'red' });
            circle2.bindPopup(this.popupService.makeCapitalPopup(c));
            circle2.addTo(map);
        }
    }


}