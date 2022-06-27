import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Countries, IStatsData } from 'src/app/core/models/countries.model';
import { CoreService } from 'src/app/core/services/core.service';
import { SharedService } from 'src/app/core/services/shared.serivce';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  filterTerm = "";
  countriesData: Array<IStatsData> | undefined;
  isAscendingSort: boolean = false;
  isAscActiveSrt: boolean = false;
  isAscNewSrt: boolean = false;
  isAscDeathSrt: boolean = false;
  private sortOrder = 0;
  @Input() countriesName: string[] = [];
  suggestions: string[] = [];
  constructor(public sharedService: SharedService,
    private readonly coreService: CoreService) { }

  ngOnInit(): void {
    this.getCountries();
  }
  getCountries() {
    this.sharedService.countryList.subscribe((data) => {
      this.countriesData = data;

    }, (error) => {
      console.log(error);
    })
  }

  sortByCountry() {
    this.isAscendingSort = !this.isAscendingSort;

    this.countriesData?.sort(function (a, b) {
      if (a.country < b.country) {
        return -1;
      }
      if (a.country > b.country) {
        return 1;
      }
      return 0;
    });

    if (!this.isAscendingSort) {
      this.countriesData?.sort(function (a, b) {
        if (a.country < b.country) {
          return 1;
        }
        if (a.country > b.country) {
          return -1;
        }
        return 0;
      });
    }
  }

  sortByActive() {
    this.isAscActiveSrt = !this.isAscActiveSrt;
    if (this.isAscActiveSrt) {
      this.countriesData?.sort(function (a, b) {
        return a.cases?.active - b.cases?.active;
      });
    }
    else {
      this.countriesData?.sort(function (a, b) {
        return b.cases?.active - a.cases?.active;
      });
    }

  }
  sortByNew() {
    this.isAscNewSrt = !this.isAscNewSrt;
    if (this.isAscNewSrt) {
      this.countriesData?.sort(function (a, b) {
        return a.cases?.new - b.cases?.new;
      });
    }
    else {
      this.countriesData?.sort(function (a, b) {
        return b.cases?.new - a.cases?.new;
      });
    }

  }
  sortByDeath() {
    this.isAscDeathSrt = !this.isAscDeathSrt;
    if (this.isAscDeathSrt) {
      this.countriesData?.sort(function (a, b) {
        return a?.deaths?.total - b?.deaths?.total;
      });
    }
    else {
      this.countriesData?.sort(function (a, b) {
        return b?.deaths?.total - a?.deaths?.total;
      });
    }
  }

  onSelectCountry(_country: any) {
    this.sharedService.setSelectedCountry(_country);
    this.coreService.getCountriesHistory(_country).subscribe((data: any) => {
      this.sharedService.setHistoricalData(data.response)
    })

  }
}
