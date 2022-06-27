import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from '../core/services/core.service';
import { SharedService } from '../core/services/shared.serivce';
import { Observable, forkJoin } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countriesName = [];
  constructor(public coreService: CoreService,
    public sharedService: SharedService) { }

  ngOnInit(): void {
    this.getCovidData();

  }
  getCovidData() {

    forkJoin([this.coreService.getCountries(),
    this.coreService.getCountriesStats(),
    this.coreService.getCountriesHistory(),
    this.coreService.getCountriesLatLong()]).subscribe((results) => {
      this.countriesName = results[0]?.response;
      this.setLatLongOndata(results[1].response, results[3]);
      this.setHistoryData(results[2].response);

    }, (_error) => {

    })
  }
  setHistoryData(response: any) {
    this.sharedService.setHistoricalData(response)
  }
  async setLatLongOndata(givenStats: any, givenLats: any) {

    await givenStats.map((_stat: any) => {
      let countryFound = givenLats.find((country: { name: any; altSpellings: any[]; }) =>
        country.name.common.toUpperCase().indexOf(_stat.country.toUpperCase()) != -1 ||
        country.altSpellings.findIndex(
          alt => alt.toUpperCase().indexOf(_stat.country.toUpperCase()) != -1,
        ) != -1,
      );
      if (!countryFound) countryFound = {};
      _stat.urlFlag = countryFound.flag;
      _stat.latlng = countryFound.latlng;
      return _stat
    });

    this.sharedService.setCountryData(givenStats);


  }



}
