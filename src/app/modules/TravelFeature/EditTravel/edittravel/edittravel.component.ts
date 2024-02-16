import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { updateTravelDto } from 'src/app/Model/UpdateTravel.model';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { TravelserviceService } from 'src/app/service/travelservice.service';

@Component({
  selector: 'app-edittravel',
  templateUrl: './edittravel.component.html',
  styleUrls: ['./edittravel.component.css'],
})
export class EdittravelComponent implements OnInit, OnDestroy {
  updateTravelById: updateTravelDto = {
    travelId: 0,
    travelSource: '',
    travelDestination: '',
    travel_time: '',
    travelDate: '',
    travelCost: '',
    cabId: 0,
    driverId: 0,
  };

  travel: any = {
    travelId: 0,
    travelSource: '',
    travelDestination: '',
    travel_time: '',
    travelDate: '',
    travelCost: '',
  };

  driver: any;
  cab: any;

  travelId: Number;

  selectDriver: any[] = [];
  selectCab: any;

  subscription: Subscription = new Subscription();

  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelserviceService,
    private driverService: DriverServiceService,
    private router: Router
  ) {}

  loadGetTravelById() {
    this.isLoading = true;

    this.route.params
      .pipe(
        switchMap((params) => {
          this.travelId = params['id'];
          return this.travelService.getTravelById(this.travelId);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res && res.data) {
            this.travel.travelId = res.data.travelId;
            this.travel.travelSource = res.data.travelSource;
            this.travel.travelDestination = res.data.travelDestination;
            this.travel.travel_time = res.data.travel_time;
            this.travel.travelDate = res.data.travelDate;
            this.travel.travelCost = res.data.travelCost;
            this.cab = res.data.cab;
            this.driver = res.data.driver;
          } else {
            this.isError = true;
            alert('Error');
          }
        },
        error: (error: any) => {
          this.isError = true;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  loadGetAllTravel() {
    this.isLoading = true;
    const getAllTravelSubscription = this.driverService
      .getAllDriver()
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.selectDriver = res.data;
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    this.subscription.add(getAllTravelSubscription);
  }

  onDriverSelectChange() {
    const getDriver = this.selectDriver.find(
      (driver) => driver.driverId == this.driver.driverId
    );

    this.cab = getDriver.cab;
  }

  onUpdateTravel() {
    this.updateTravelById.travelId = this.travel.travelId;
    this.updateTravelById.travelSource = this.travel.travelSource;
    this.updateTravelById.travelDestination = this.travel.travelDestination;
    this.updateTravelById.travel_time = this.travel.travel_time;
    this.updateTravelById.travelDate = this.travel.travelDate;
    this.updateTravelById.travelCost = this.travel.travelCost;
    this.updateTravelById.driverId = this.driver.driverId;
    this.updateTravelById.cabId = this.cab.cabId;

    console.log(this.updateTravelById);

    this.saveUpdatedTravel(this.updateTravelById);
  }

  saveUpdatedTravel(obj: any) {
    this.isLoading = true;
    console.log('loading');
    const saveUpdateTravelSubscription = this.travelService
      .updateTravel(this.travelId, obj)
      .subscribe({
        next: (res: any) => {
          if (res.message == 'success') {
            console.log('updated');
            this.router.navigateByUrl('/travel');
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('loading compelted');
        },
      });
    this.subscription.add(saveUpdateTravelSubscription);
  }

  ngOnInit(): void {
    this.loadGetTravelById();
    this.loadGetAllTravel();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
