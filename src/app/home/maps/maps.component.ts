import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { CoreService } from 'src/app/core/services/core.service';
import { MarkerService } from 'src/app/core/services/marker.service';
import { SharedService } from 'src/app/core/services/shared.serivce';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  map!: L.Map;
  countryStats: any;
  markers: L.Layer[] = [];
  countryName: string | undefined;
  activeCases: string | undefined;
  newCases: String | undefined;
  totalCases: string | undefined;



  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: latLng([24.879966, 49.726909])
  };
  constructor(private markerService: MarkerService,
    private sharedService: SharedService,
    private coreService: CoreService) { }

  ngOnInit(): void {
    this.getCountryStats('all');

  }

  ngAfterViewInit(): void { }
  getCountryStats(country: string) {
    this.coreService.getCountryStatsByName(country).subscribe((data) => {
      this.countryName = data?.response[0]?.country;
      this.activeCases = data?.response[0]?.cases?.active;
      this.newCases = data?.response[0]?.cases?.new;
      this.totalCases = data?.response[0]?.cases?.total;
    }, (error) => {
      console.log(error)
    })
  }
  onMapReady(map: L.Map) {
    this.map = map;
    this.setMarkerForCountries();
    this.setViewOnMap();


  }
  setViewOnMap() {
    this.sharedService.selectedCountry.subscribe((data) => {
      this.map.setView(data?.latlng ? data.latlng : [0, 0]);
      this.getCountryStats(data?.country);
    }, (error) => {
      console.log(error);
    })
  }
  setMarkerForCountries() {
    this.sharedService.countryList.subscribe((data) => {
      this.countryStats = data;
      this.setActiveCases();

    }, (err) => {
      console.log(err)
    })
  }

  setActiveCases() {
    this.markerService.makeCapitalCircleMarkers(this.map, this.countryStats);
  }
  setDeathCases() {
    this.markerService.makeCapitalCircleDeathMarkers(this.map, this.countryStats)
  }





}
