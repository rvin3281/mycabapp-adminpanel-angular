import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelserviceService {
  allStateEndPoint: string = 'https://jian.sh/malaysia-api/state/v1/all.json';
  apiEndPoint: string = 'http://localhost:8082/api/v1/travel';

  constructor(private http: HttpClient) {}

  private travelUpdated = new Subject<void>();

  $travelUpdated = this.travelUpdated.asObservable();

  registerTravel(obj: any) {
    return this.http.post(this.apiEndPoint, obj);
  }

  getAllTravel() {
    return this.http.get(this.apiEndPoint);
  }

  getTravelById(id: Number) {
    return this.http.get(this.apiEndPoint + `/${id}`);
  }

  updateTravel(id: Number, obj: any) {
    return this.http.patch(this.apiEndPoint + `/${id}`, obj).pipe(
      tap(() => {
        this.travelUpdated.next();
      })
    );
  }

  deleteTravelById(id: Number) {
    return this.http.delete(this.apiEndPoint + `/${id}`).pipe(
      tap(() => {
        this.travelUpdated.next();
      })
    );
  }

  getAllState() {
    return this.http.get(this.allStateEndPoint);
  }
}
