import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin, switchMap } from 'rxjs';
import { loadDriver } from 'src/app/Model/LoadDriver.model';
import { cabdto } from 'src/app/Model/cabdto.model';
import { updateDriver } from 'src/app/Model/updateDriver.model';
import { CabServiceService } from 'src/app/service/cab-service.service';
import { DriverServiceService } from 'src/app/service/driver-service.service';

@Component({
  selector: 'app-editdriver',
  templateUrl: './editdriver.component.html',
  styleUrls: ['./editdriver.component.css'],
})
export class EditdriverComponent implements OnInit, OnDestroy {
  driverId: Number;

  displayDriver: loadDriver = {
    driverId: 0,
    driverName: '',
    driverContact: '',
    driverIdentificationNum: '',
    cab: '',
  };

  updateDriverById: updateDriver = {
    driverId: 0,
    driverName: '',
    driverContact: '',
    driverIdentificationNum: '',
    cabId: 0,
  };

  availableCabs: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private driverService: DriverServiceService,
    private cabService: CabServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.driverId = params['id'];
          return this.driverService.getDriverById(this.driverId);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            if (res && res.data) {
              this.displayDriver.driverId = res.data.driverId;
              this.displayDriver.driverName = res.data.driverName;
              this.displayDriver.driverIdentificationNum =
                res.data.driverIdentificationNum;
              this.displayDriver.driverContact = res.data.driverContact;
              this.displayDriver.cab = res.data.cab;

              if (res.data.cab != null) {
                this.updateDriverById.cabId = res.data.cab.cabId;
              } else {
                this.updateDriverById.cabId = 0;
              }
            }
          }
        },
        error: (error: any) => {
          alert(error);
        },
        complete: () => {},
      });

    forkJoin({
      cabs: this.cabService.getAllCab(),
      drivers: this.driverService.getAllDriver(),
    }).subscribe({
      next: (res: any) => {
        if (
          res.cabs.message === 'success' &&
          res.drivers.message === 'success'
        ) {
          console.log(res.cabs);
          console.log(res.drivers);
          if (res.cabs.data.length > 0 && res.drivers.data.length > 0) {
            const assignId = res.drivers.data.map(
              (driver) => driver.cab?.cabId
            );

            //console.log(assignId);

            // Filter out cabs that are already assigned
            this.availableCabs = res.cabs.data.filter(
              (cab) => !assignId.includes(cab.cabId)
            );
          }

          //console.log(this.availableCabs);
        } else {
          // Handle error case...
        }
      },
    });
  }

  updateDriver() {
    this.updateDriverById.driverId = this.displayDriver.driverId;
    this.updateDriverById.driverName = this.displayDriver.driverName;
    this.updateDriverById.driverContact = this.displayDriver.driverContact;
    this.updateDriverById.driverIdentificationNum =
      this.displayDriver.driverIdentificationNum;

    console.log(this.displayDriver.driverId);

    if (typeof this.updateDriverById.cabId === 'string') {
      this.updateDriverById.cabId = parseInt(this.updateDriverById.cabId);
    }

    if (this.updateDriverById.cabId == 0) {
      alert('Wrong Selection for Cab.Please try again');
      return;
    }

    const updateCabSubscription = this.driverService
      .updateDriver(this.updateDriverById, this.driverId)
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            this.router.navigateByUrl(`/driver`);
          }
        },
        error: (error: any) => {
          alert(error);
        },
        complete: () => {},
      });
    this.subscription.add(updateCabSubscription);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
