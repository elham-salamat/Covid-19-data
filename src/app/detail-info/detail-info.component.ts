import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../services/covid-data.service';
import { TableData } from '../interfaces/geographical-covid-data';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  displayedColumns: string[] = ['City', 'TotalCovidCases', 'NewCovidCases', 'TotalCovidDeaths', 'NewCovidDeaths'];
  detailedData: TableData[] = [];

  constructor(private covidDataService: CovidDataService) { }

  ngOnInit(): void {

    this.covidDataService.detailedInfo.subscribe(data => {
      data.forEach((item) => {
        this.detailedData.push(
          {
            City: item.AdmUnitId,
            TotalCovidCases: item.AnzFall,
            NewCovidCases: item.AnzFallNeu,
            TotalCovidDeaths: item.AnzTodesfall,
            NewCovidDeaths: item.AnzTodesfallNeu,
          });
      });
    });
  }


}
