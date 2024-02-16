import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  apiEndPoint: string = 'http://localhost:8081/api/v1/user';

  constructor(private http: HttpClient) {}

  register(obj: any) {
    return this.http.post(this.apiEndPoint, obj);
  }

  login(obj: any) {
    return this.http.post(this.apiEndPoint + '/login', obj);
  }
}
