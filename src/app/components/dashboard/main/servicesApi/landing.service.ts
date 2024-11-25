import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private baseUrl = 'http://compassint.ddns.net:2036/api/services/app/'
  constructor(private http: HttpClient) { }

  getSlider(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}PrSliderSettings/GetAllSliders`);
  }
  // http://compassint.ddns.net:2036/api/services/app/WebsiteQuickDonation/GetAllWebsiteQuickDonation
  getDonations(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}WebsiteQuickDonation/GetAllWebsiteQuickDonation`)
  }

}
