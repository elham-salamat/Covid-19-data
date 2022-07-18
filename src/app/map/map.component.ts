import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../services/covid-data.service';
import { GeographicalCovidData } from '../interfaces/geographical-covid-data';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  geoCovidData: GeographicalCovidData[] = [];

  backgroundColor: string[] = [];

  constructor(private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.setCovidData();
    this.setِAlertLevel();
  }

  setCovidData(): void {
    setTimeout(() => {
      this.covidDataService.covidData.subscribe(data => {
        data.forEach((item) => {
          if (item.attributes.BundeslandId == item.attributes.AdmUnitId) {
            // console.log(item.attributes);
            this.geoCovidData.push(
              {
                'State': item.attributes.BundeslandId,
                'Total Covid Cases': item.attributes.AnzFall,
                'Total Covid Deaths': item.attributes.AnzTodesfall,
                'Total Active Covid Cases': item.attributes.AnzAktiv,
                'Total Recovered Covid Cases': item.attributes.AnzGenesen,
                'New Covid Cases': item.attributes.AnzFallNeu,
                'New Covid Deaths': item.attributes.AnzTodesfallNeu,
                'New Active Covid Cases': item.attributes.AnzAktivNeu,
                'New Recovered Covid Cases': item.attributes.AnzGenesenNeu,
                '7day Covid Cases Count': item.attributes.AnzFall7T,
                'covidIncidence': item.attributes.Inz7T
              });
          }
        })
      })
    }, 200)
  }

  stateIdExtract(stateId: number) {
    this.covidDataService.setStateId(stateId);
  }


  setِAlertLevel(): any {
    setTimeout(() => {
      this.geoCovidData.forEach(data => {
        var AnzFall7T = data.covidIncidence;

        switch (true) {

          case (AnzFall7T >= 1000):
            this.backgroundColor[data.State] = '#4d004d';
            break;

          case (1000 > AnzFall7T && AnzFall7T >= 800):
            this.backgroundColor[data.State] = '#660000';
            break;

          case (800 > AnzFall7T && AnzFall7T >= 600):
            this.backgroundColor[data.State] = '#ff9900';
            break;

          case (600 > AnzFall7T && AnzFall7T >= 400):
            this.backgroundColor[data.State] = '#ffff00';
            break;

          default:
            this.backgroundColor[data.State] = '#b4b1b7';
            break;
        }

      });

      return this.backgroundColor

    }, 200)
  }

}
