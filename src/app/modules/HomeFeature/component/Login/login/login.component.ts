import { Component, OnDestroy } from '@angular/core';
import { LoginModel } from '../../../../../Model/login.model';
import { HomeServiceService } from '../../../../../service/home-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  private subscription: Subscription;

  loginObj: LoginModel = {
    user_email: '',
    user_password: '',
  };

  constructor(
    private homeService: HomeServiceService,
    private router: Router
  ) {}

  onLogin() {
    this.subscription = this.homeService.login(this.loginObj).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          console.log(res.data);
          // Assuming the user data (excluding JWT) is part of the response
          // KEY     // STORE DATA IN STRING
          localStorage.setItem('userData', JSON.stringify(res.data));

          // JWT is set in an HttpOnly cookie by the server, not handled here

          // ROUTE TO DASHBOARD IF LOGIN SUCCESS
          this.router.navigateByUrl('/travel');

          // Handle success scenario
          console.log(`Login successful`);
        } else {
          // Handle login failure and other scenarios
          console.log('Login failed');
        }
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
        // Handle error gracefully
      },
      complete: () => {
        // Optional: Perform any cleanup tasks
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    // using the safe navigation operator (?.). This ensures that the unsubscribe method is only called if subscription is defined.
    this.subscription?.unsubscribe();
  }
}
