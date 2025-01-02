import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  aboutBoardOfDirectors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}WebsiteBoardOfDirectors/GetAllWebsiteBoardOfDirectors`);
  };

  aboutStrtegies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}WebsiteStrategy/GetAllWebsiteStrategyForWebsite `);
  };
  aboutWebsiteStatistic(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}WebsiteStatistics/GetAllWebsiteStatistic?IsActive=true&StatisticsTypeLkpId=12472 `);
  };
 
  login(body: any): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.post<any>(`${this.apiUrl}SpBeneficent/Login`, body, { headers });
   }
 
   Registerlogin(body: any): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.post<any>(`${this.apiUrl}SpBeneficent/Registration`, body, { headers });
   }

   // contact us methods start

  getContactMethods(lang: string): Observable<any> {

    return this.http.get(`${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=WebsiteContactUsContactVia&pageSize=20&pageNumber=1&lang=${lang}`);
  }

  getRequestTypes(lang: string ): Observable<any> {

    return this.http.get(`${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=WebsiteContactUsRequestType&pageSize=20&pageNumber=1&lang=${lang}`);
  }

  contactusAdd(body: any): Observable<any> {

     return this.http.post<any>(`${this.apiUrl}WebsiteContactUs/Create `, body);
   }

   // start of media service
   getmediaCenter(): Observable<any> {
    
    return this.http.get(`${this.apiUrl}WebsiteGallery/GetAllWebsiteGalleryForWebsite`);
  }
}
