import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.serivce';

@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.scss']
})
export class KpiCardsComponent implements OnInit {
  historyData: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
