import { MapComponent } from './map/map.component';
import { Routes } from '@angular/router';

// exports the routes needed for the other modules to function since this is a standalone project
export const routes: Routes = [ 
  { path: '', component: MapComponent }, // includes path '' to the root of the application and the SVG map component
];