import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { registerModel } from 'src/app/Model/register.model';
import { HomeServiceService } from 'src/app/service/home-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  private subscription: Subscription;

  registerObj: registerModel = {
    user_name: '',
    user_identity: '',
    user_gender: '',
    user_mobile: '',
    user_email: '',
    user_address: '',
    user_state: '',
    user_city: '',
    user_password: '',
  };

  constructor(
    private homeService: HomeServiceService,
    private router: Router
  ) {}

  onRegister() {
    this.subscription = this.homeService.register(this.registerObj).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          alert('success');
          this.router.navigateByUrl('/login');
        } else {
          alert('fail');
        }
      },
      error: (error: any) => {
        console.log('An error occured', error);
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
