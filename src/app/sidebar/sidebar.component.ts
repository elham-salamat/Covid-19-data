import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { CovidDataService } from '../services/covid-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  covidDataInState: any;
  stateId: number = 0;
  state: string = 'Germany';


  constructor(private covidDataService: CovidDataService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setState();
    this.setStateId();
    this.setCovidData(this.stateId);
  }


  setStateId(): void {
    this.covidDataService.selectedStateId.subscribe(id => {
      this.stateId = id;
      this.setCovidData(this.stateId);
    })
  }

  setState(): void {
    this.covidDataService.selectedState.subscribe(id => {
      this.state = id;
    })
  }

  showDataforGermany(): void {
    this.covidDataService.setStateId(0);
    this.setState();
    this.setStateId();
  }

  openDetailDialog() {
    this.covidDataService.detailedInfoExtraction(this.stateId);
    this.dialog.open(DetailInfoComponent, {
      height: '98vh',
      width: '700px',
    })
  }

  setCovidData(id: number): void {
    setTimeout(() => {
      this.covidDataService.covidData.subscribe(data => {
        data.forEach((item) => {
          if (item.attributes.BundeslandId == id) {
            this.covidDataInState = {
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
            }
          }
        })
      })
    }, 200)


  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => { return 0; }

}
