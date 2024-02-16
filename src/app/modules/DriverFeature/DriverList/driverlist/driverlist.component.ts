import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverServiceService } from 'src/app/service/driver-service.service';

@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.css'],
})
export class DriverlistComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  getAllDriverSubsribe: Subscription = new Subscription();

  loadDriverList: any[] = [];

  // MANAGE STATE //
  hasData: boolean = false;
  isLoading: boolean = true;

  constructor(private driverService: DriverServiceService) {}

  ngOnDestroy(): void {
    this.getAllDriverSubsribe?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadAllDriver();

    this.subscription.add(
      this.driverService.$driverUpdated.subscribe(() => {
        this.loadAllDriver();
      })
    );
  }

  loadAllDriver() {
    this.isLoading = true; // LOADING STARTS

    this.getAllDriverSubsribe = this.driverService.getAllDriver().subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          if (res.data.length > 0 && res.data != null) {
            this.loadDriverList = res.data;
            this.hasData = res.data.length > 0; // Check if data is present
          } else {
            this.hasData = false;
          }
        }
      },
      error: (error: any) => {
        console.log(error);
        this.hasData = false; // Assume no data on error
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDeleteDriver(id: Number) {
    this.isLoading = true;
    const deleteDriverSubscription = this.driverService
      .deleteDriver(id)
      .subscribe({
        next: (res: any) => {
          if (res.message) {
          } else {
            alert('Cannot Delete');
          }
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });

    this.subscription.add(deleteDriverSubscription);
  }
}
