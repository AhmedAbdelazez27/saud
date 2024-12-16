import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/shared/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  // providers: [
  //   provideRouter(routes),
  //    provideHttpClient(withInterceptors([authInterceptor])),
  //   importProvidersFrom(BrowserAnimationsModule),
  // ]
  providers: [
    provideRouter(routes, withInMemoryScrolling({ 
      scrollPositionRestoration: 'enabled', // Restores scroll to top on navigation
      // anchorScrolling: 'enabled',   
    })),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
    ),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
    )
  ]
}).catch(err => console.error(err));
