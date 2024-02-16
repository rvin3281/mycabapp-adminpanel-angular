import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CabServiceService } from 'src/app/service/cab-service.service';

@Component({
  selector: 'app-cablist',
  templateUrl: './cablist.component.html',
  styleUrls: ['./cablist.component.css'],
})
export class CablistComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  getsubscription: Subscription = new Subscription();
  cabList: any[] = [];

  // Manage State
  hasData: Boolean = false;
  isLoading: Boolean = true;

  constructor(private cabService: CabServiceService) {}

  ngOnInit(): void {
    this.getAllCabs();
    // Subscribe to the cab update event
    this.subscription.add(
      this.cabService.cabUpdated$.subscribe(() => {
        // Refresh the list of cabs
        this.getAllCabs();
      })
    );
  }

  getAllCabs() {
    this.isLoading = true;

    const getSubscription = this.cabService.getAllCab().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.message === 'success') {
          this.cabList = res.data;
          this.hasData = res.data.length > 0;
        } else {
          this.hasData = false;
        }
      },
      error: (error: any) => {
        this.isLoading = false; // Ensure loading is set to false on error
        console.log(error);
        this.hasData = false; // Assume no data on error
      },
      complete: () => {},
    });
    this.subscription.add(getSubscription);
  }

  onDeleteCab(id: Number) {
    this.isLoading = true;
    const deleteSubscription = this.cabService.deleteCab(id).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
        } else {
          alert('error');
        }
      },
      error: (error: any) => {
        alert(error.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
    this.subscription.add(deleteSubscription);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
