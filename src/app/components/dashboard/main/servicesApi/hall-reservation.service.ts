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

    /**
   * Create a new reservation.
   * @param reservationData The reservation data to be sent in the request body.
   */
    createReservation(reservationData: any): Observable<any> {
      const url = `${this.baseUrl}/WebsiteCouncilRequest/CreateWebsiteCouncilRequest`;
      return this.http.post<any>(url, reservationData);
    }
  
    /**
     * Get lookup values for TypeOfEvent.
     * @param pageSize The number of results per page.
     * @param pageNumber The current page number.
     * @param lang The language code.
     */
    getTypeOfEventLookup(pageSize = 200, pageNumber = 1, lang = 'en-US'): Observable<any> {
      const url = `${this.baseUrl}/FndLookupValues/GetFndLookupValuesSelect2?type=CouncilRequestTypeOfEvent&pageSize=${pageSize}&pageNumber=${pageNumber}&lang=${lang}`;
      return this.http.get<any>(url);
    }
  
    /**
     * Get lookup values for OtherOptions.
     * @param pageSize The number of results per page.
     * @param pageNumber The current page number.
     * @param lang The language code.
     */
    getOtherOptionsLookup(pageSize = 200, pageNumber = 1, lang = 'ar-EG'): Observable<any> {
      const url = `${this.baseUrl}/FndLookupValues/GetFndLookupValuesSelect2?type=CouncilOtherOptions&pageSize=${pageSize}&pageNumber=${pageNumber}&lang=${lang}`;
      return this.http.get<any>(url);
    }
}
