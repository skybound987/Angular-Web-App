import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const bootstrapConfig = {  // initializes the configuration constant for Bootstrap
  providers: [
    ...appConfig.providers,  // Spreads the existing providers from appConfig
    provideHttpClient()      // Provides the built-in HttpClient with Angular
  ]
};

bootstrapApplication(AppComponent, bootstrapConfig) // This enables bootstrap services to called on and function within the application
  .catch((err) => console.error(err)); // logs error to the developer console in the browser
