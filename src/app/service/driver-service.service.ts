import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverServiceService {
  apiEndpoint: string = 'http://localhost:8082/api/v1/driver';

  constructor(private http: HttpClient) {}

  private driverUpdated = new Subject<void>();

  $driverUpdated = this.driverUpdated.asObservable();

  registerDriver(obj: any) {
    return this.http.post(this.apiEndpoint, obj);
  }

  getAllDriver() {
    return this.http.get(this.apiEndpoint);
  }

  getDriverById(id: Number) {
    return this.http.get(this.apiEndpoint + `/${id}`);
  }

  updateDriver(obj: any, id: Number) {
    return this.http.patch(this.apiEndpoint + `/${id}`, obj).pipe(
      tap(() => {
        this.driverUpdated.next();
      })
    );
  }

  deleteDriver(id: Number) {
    return this.http.delete(this.apiEndpoint + `/${id}`).pipe(
      tap(() => {
        this.driverUpdated.next();
      })
    );
  }
}
