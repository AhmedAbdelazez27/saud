import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallReservationService {
  private baseUrl = 'http://compassint.ddns.net:2036/api/services/app';

  constructor(private http: HttpClient) {}

  // Fetch TypeOfEventLkpId options
  getTypeOfEventOptions(): Observable<any> {
    const url = `${this.baseUrl}/FndLookupValues/GetFndLookupValuesSelect2?type=HallRequestTypeOfEvent&pageSize=200&pageNumber=1&lang=en-US`;
    return this.http.get(url);
  }

  // Fetch OtherOptionsLkpId options
  getOtherOptions(): Observable<any> {
    const url = `${this.baseUrl}/FndLookupValues/GetFndLookupValuesSelect2?type=HallOtherOptions&pageSize=200&pageNumber=1&lang=ar-EG`;
    return this.http.get(url);
  }

  // Create a hall reservation
  createHallReservation(data: any): Observable<any> {
    const url = `${this.baseUrl}/WebsiteHallRequest/CreateWebsiteHallRequest`;
    return this.http.post(url, data);
  }
}
