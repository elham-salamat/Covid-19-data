import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FetchApiDataService } from './fetch-api-data.service';


@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  germanStates2: any;

  private _covidDate = new BehaviorSubject<any[]>([]);
  covidData = this._covidDate.asObservable();

  private _selectedStateId = new BehaviorSubject<number>(0);
  selectedStateId = this._selectedStateId.asObservable();

  private _selectedState = new BehaviorSubject<string>('Federal Republic of Germany');
  selectedState = this._selectedState.asObservable();

  private _detaiedInfo = new BehaviorSubject<any[]>([]);
  detailedInfo = this._detaiedInfo.asObservable();

  constructor(private fetchApiData: FetchApiDataService) {
    this.getCovidStatistics();
    this.germanStatesData();
  }

  getCovidStatistics(): void {
    this.fetchApiData
      .CovidDataInGermany()
      .subscribe((response: any) => {
        this._covidDate.next(response.features);
      });
  }

  germanStatesData(): void {
    this.fetchApiData
      .germanStates()
      .subscribe((response: any) => {
        this.germanStates2 = response;
      })
  }

  setStateId(stateId: number): void {
    this._selectedStateId.next(stateId);
    this._selectedState.next(this.germanStates2[stateId].Name)
  }

  detailedInfoExtraction(stateId: number): void {
    let regionalData: any[] = [];
    this._covidDate.subscribe(data => {
      data.forEach((item) => {
        if (item.attributes.BundeslandId == stateId) {
          regionalData.push(item.attributes)
        }
      });
    });

    regionalData.forEach((item) => {
      item.AdmUnitId = this.germanStates2[item.AdmUnitId].Name;
    })

    this._detaiedInfo.next(regionalData);
  }
}

