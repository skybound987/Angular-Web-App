import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private worldbankUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  getCountryInfo(isoCode: string): Observable<any> {
    return this.http.get(`${this.worldbankUrl}/${isoCode}?format=json`);
  }
}
