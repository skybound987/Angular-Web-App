import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldBankService } from './world-bank.service';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent {  // Class structure for the map component
  tooltip = '';
  tooltipShow = false;
  tooltipPosition = { x: 0, y: 0}; // initializes the tooltip position at 0,0
  hoverTime: number | undefined;
  countryInfo: any = null;

  @Output() countryData = new EventEmitter<any>();

  constructor(private worldbank: WorldBankService) {}

  mouseOver(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const countryId = target.getAttribute('id')!;  // 'id' gets the country ISO code, which is the standard method for WorldBank when querying for data
    
    this.worldbank.getCountryInfo(countryId).subscribe(data => {
      if (data && data[1] && data[1].length > 0 && data[1][0]) {  // Checks if the data is actually data, that is located at [1], and that its length is greater than zero
        const countryInfo = data[1][0]; // Extracts the country information from the array produced by the API call, starting at zero
        this.countryData.emit(countryInfo); // Emits the data so that it can be pulled into the app component
        this.countryInfo = countryInfo; // Sets up countryInfo variable to pull data from the extracted info from the API call
    
        this.tooltip = countryInfo.name; // Sets the tooltip to the country's name
        window.clearTimeout(this.hoverTime);  // Clears a timeout if a previous timer exists
        this.hoverTime = window.setTimeout(() => {  // sets a timer of 1 second that tracks user cursor hover
          this.tooltipShow = true;  //  Shows the tool tip if the user hovers greater than or equal to 1 second
          this.tooltipPosition = { x: event.clientX, y: event.clientY };  // displays the tooltip at user cursor location
        }, 1000);  
      }
    });
  }

  mouseMove(): void {
    window.clearTimeout(this.hoverTime);
    this.tooltipShow = false;
  }
}

