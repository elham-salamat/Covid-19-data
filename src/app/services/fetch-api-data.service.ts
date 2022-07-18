import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const RobertKochCovidApiUrl = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/rki_key_data_v/FeatureServer/0/query";

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  public CovidDataInGermany(): Observable<any> {
    let params1 = new HttpParams()
      .set('referer', 'https://www.mywebapp.com')
      .set('user-agent', 'python-requests/2.9.1')
      .set('where', '1=1')
      .set('outFields', '*')
      .set('returnGeometry', 'False')
      .set('f', 'json')
      .set('cacheHint', 'True');

    return this.http
      .get(RobertKochCovidApiUrl, { params: params1 })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public germanStates(): Observable<any> {
    return this.http
      .get("https://api.elhamsalamat.com/state_info.php")
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}