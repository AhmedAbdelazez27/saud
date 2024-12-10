import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  private apiUrl = 'http://compassint.ddns.net:2036/api/services/app/';  
  constructor(private http: HttpClient) {}

  aboutGeneralInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}WebsiteAboutUs/GetAllWebsiteAboutUsForWebsite`);
  };

 
}
