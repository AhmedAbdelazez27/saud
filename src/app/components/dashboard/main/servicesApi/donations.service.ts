import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private apiUrl = 'http://compassint.ddns.net:2036/api/services/app/'; 

  constructor(private http: HttpClient) {}

  submitDonationClothes(donationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}WebsiteClothesCollectionProject/Create`, donationData);
  };

  submitDonationFoods(donationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}PreservingGraceRequest/CreatePreservingGraceRequest`, donationData);
  };
  /**
   * Fetch Volunteer Types
   * 
   */
    getDonations(): Observable<any> {
      return this.http.get(
        `${this.apiUrl}TmAutoCoupons/GetAllTmAutoCouponsForWebsite`
      );
    }
  
    /**
     * Submit Volunteer Request
     */
    submitVolunteerRequest(data: any): Observable<any> {
      return this.http.post(
        `${this.apiUrl}WebsiteVolunteerProjectRequest/CreateWebsiteVolunteerProjectRequest`,
        data
      );
    };

    Createportal(body: any): Observable<any> {
   
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return this.http.post<any>(`${this.apiUrl}OrderInfo/Createportal`, body, { headers });
     }
}
