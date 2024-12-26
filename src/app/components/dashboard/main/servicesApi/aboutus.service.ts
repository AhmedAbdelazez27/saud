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

  getContactMethods(type: string, pageSize: number = 20, pageNumber: number = 1, lang: string = 'en-US'): Observable<any> {
    const params = {
      type,
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString(),
      lang
    };
    return this.http.get(`${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=WebsiteContactUsContactVia&pageSize=20&pageNumber=1&lang=en-US`);
  }

  getRequestTypes(type: string, pageSize: number = 20, pageNumber: number = 1, lang: string = 'en-US'): Observable<any> {
    const params = {
      type,
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString(),
      lang
    };
    return this.http.get(`${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=WebsiteContactUsRequestType&pageSize=20&pageNumber=1&lang=en-US`);
  }

  contactusAdd(body: any): Observable<any> {

     return this.http.post<any>(`${this.apiUrl}WebsiteContactUs/Create `, body);
   }
}
