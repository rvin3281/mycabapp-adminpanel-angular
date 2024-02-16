import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TravelserviceService } from 'src/app/service/travelservice.service';

@Component({
  selector: 'app-travellist',
  templateUrl: './travellist.component.html',
  styleUrls: ['./travellist.component.css'],
})
export class TravellistComponent implements OnInit, OnDestroy {
  travelList: any[] = [];
  subscription: Subscription = new Subscription();
  isLoading: boolean = true;
  hasData: boolean = false;

  constructor(private travelService: TravelserviceService) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllTravel();

    this.subscription.add(
      this.travelService.$travelUpdated.subscribe(() => {
        this.getAllTravel();
      })
    );
  }

  getAllTravel() {
    this.isLoading = true; // LOADING STARTS
    const getAllTravelSubscription = this.travelService
      .getAllTravel()
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.travelList = res.data;
            this.hasData = res.data.length > 0; // Check if data is present
          } else {
            this.hasData = false;
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
    this.subscription.add(getAllTravelSubscription);
  }

  onDeleteTravel(id: Number) {
    this.isLoading = true;
    const deleteSubscription = this.travelService
      .deleteTravelById(id)
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

    // Add the new subscription to the subscription group without overwriting it
    this.subscription.add(deleteSubscription);
  }
}
