import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  loggedUserData: any;

  constructor(private router: Router) {
    const localData = localStorage.getItem('userData');
    if (localData != null) {
      // Convert String Local Storage to Object

      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOff() {
    localStorage.removeItem('userData');
    this.loggedUserData = undefined;
    this.router.navigateByUrl('/login');
  }
}
