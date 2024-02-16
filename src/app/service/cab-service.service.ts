import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CabServiceService {
  apiEndPoint: string = 'http://localhost:8082/api/v1/cab';

  constructor(private http: HttpClient) {}

  private cabUpdated = new Subject<void>();

  // Observable to which components can subscribe
  cabUpdated$ = this.cabUpdated.asObservable();

  registerCab(obj: any) {
    return this.http.post(this.apiEndPoint, obj);
  }

  getAllCab() {
    return this.http.get(this.apiEndPoint);
  }

  getCabbyId(id: any) {
    return this.http.get(this.apiEndPoint + `/${id}`);
  }

  updateCab(id: any, obj: any) {
    return this.http.patch(this.apiEndPoint + `/${id}`, obj).pipe(
      tap(() => {
        // Emit an event when a cab is updated
        this.cabUpdated.next();
      })
    );
  }

  deleteCab(id: any) {
    return this.http.delete(this.apiEndPoint + `/${id}`).pipe(
      tap(() => {
        this.cabUpdated.next();
      })
    );
  }
}
