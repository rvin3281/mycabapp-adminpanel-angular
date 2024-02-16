import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { registerTravelDto } from 'src/app/Model/AddTravel.mode';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { TravelserviceService } from 'src/app/service/travelservice.service';

@Component({
  selector: 'app-addnewtravel',
  templateUrl: './addnewtravel.component.html',
  styleUrls: ['./addnewtravel.component.css'],
})
export class AddnewtravelComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    private travelService: TravelserviceService,
    private driverService: DriverServiceService,
    private router: Router
  ) {}

  addTravel: registerTravelDto = {
    travelSource: '',
    travelDate: '',
    travelDestination: '',
    travel_time: '',
    travelCost: '',
    cabId: 0,
    driverId: 0,
  };

  availableDrivers: any[] = [];
  availableCabs: any;
  availableState: any[] = [];

  isLoading: boolean = true;

  addNewTravel() {
    const registerTravelSubscription = this.travelService
      .registerTravel(this.addTravel)
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            alert('Saved');
            this.router.navigateByUrl('/travel');
          } else {
            alert('error');
          }
        },
        error: (error: any) => {
          alert('internal error');
        },
      });
    this.subscription.add(registerTravelSubscription);
  }

  onDriverSelectChange() {
    const selectedDriver = this.availableDrivers.find((driver) => {
      return parseInt(driver.driverId) == this.addTravel.driverId;
    });

    if (selectedDriver && selectedDriver.cab) {
      // Assuming the driver object contains a cab object
      this.availableCabs = selectedDriver.cab; // Update availableCabs to an array containing only the selected driver's cab

      this.addTravel.cabId = selectedDriver.cab.cabId; // Automatically select this cab ID
    } else {
      this.availableCabs = []; // Clear available cabs if no driver is selected or if the driver has no associated cab
      this.addTravel.cabId = 0; // Reset cabId in the DTO
    }
  }

  getAllDriver() {
    this.isLoading = true;
    const getAllDriverSubscription = this.driverService
      .getAllDriver()
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.availableDrivers = res.data;
          } else {
            this.addTravel.driverId = 0;
            this.addTravel.cabId = 0;
          }
        },
        error: (error: any) => {},
        complete: () => {
          this.isLoading = false;
        },
      });

    this.subscription.add(getAllDriverSubscription);
  }

  getAllState() {
    this.isLoading = true;
    const getAllStateSubscription = this.travelService.getAllState().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.availableState = res; // Correctly assign to availableState
          console.log(this.availableState);
        } else {
          this.availableCabs = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching states:', error);
        this.availableState = []; // Reset on error
      },
      complete: () => {
        this.isLoading = false;
      },
    });

    this.subscription.add(getAllStateSubscription);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllDriver();
    this.getAllState();
  }
}
