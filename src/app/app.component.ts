import { Component } from '@angular/core';
import { SharedService } from './core/services/shared.serivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-dasboard';
  showSpinner: null | undefined;
  constructor(private sharedService: SharedService) {

  }
  ngOnInit(): void {

    this.sharedService.showSpinnerMessage.subscribe((showSpinnerFlag) => {
      this.showSpinner = showSpinnerFlag;
    });
  }
}
