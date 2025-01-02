import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

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
   */
    getVolunteerTypes(lang:string): Observable<any> {
      return this.http.get(
        `${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=TypeOfVolunteerWork&pageSize=20&pageNumber=1&lang=${lang}`
      );
    }
  
    /**
     * Fetch Universities
     */
    getUniversities(lang:string): Observable<any> {
      return this.http.get(
        `${this.apiUrl}FndLookupValues/GetFndLookupValuesSelect2?type=University&pageSize=20&pageNumber=1&lang=${lang}`
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

  
    getDrivers(lang:string): Observable<any> {
      return this.http.get(
        `${this.apiUrl}Websitedrivers/GetWebsitedriversSelect2?pageSize=20&pageNumber=1&lang=${lang}`
      );
    }
  
    uploadFile(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(`${this.apiUrl}WebsiteTransportRequest/UploadAttach`, formData);
    }
  
    createTransportRequest(data: any): Observable<any> {
      return this.http.post(
        `${this.apiUrl}WebsiteTransportRequest/CreateWebsiteTransportRequest`,
        data
      );
    };
  
    uploadFileAmbulanceDetails(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(`${this.apiUrl}WebsiteAmbulanceRequest/UploadAttach`, formData);
    }
  
    createAmbulanceRequest(data: any): Observable<any> {
      return this.http.post(
        `${this.apiUrl}WebsiteAmbulanceRequest/CreateWebsiteAmbulanceRequest`,
        data
      );
    }

    uploadFileVolunteerDetails(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(`${this.apiUrl}WebsiteVolunteerProjectRequest/UploadAttach`, formData);
    }
}
