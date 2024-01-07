import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorldBankService } from './map/world-bank.service';
import { MapComponent } from './map/map.component';


@Component({
  selector: 'app-root',
  standalone: true,  // Note NgModule is not used in standalone projects
  imports: [CommonModule, RouterOutlet, HttpClientModule, MapComponent],  // Using standalone requires manually importing all required components
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'J. Hendrix D280 World App';
  countryData: any;  // Variable that gets assigned with extracted data after its pulled from the API call
  countryInfo: any;  // Variable that stores countryData to be emitted from the app module to the map module

  constructor(private worldbank: WorldBankService) {}  // links the WorldBank API service to the http client

  countrySelect(countryName: string): void {  // This function 
    this.worldbank.getCountryInfo(countryName).subscribe(data => {
      this.countryData = data;
    });
  }

  handleCountryData(data: any) {
    this.countryInfo = data;
  }
}
