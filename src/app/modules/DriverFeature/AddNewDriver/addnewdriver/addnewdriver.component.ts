import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { CabServiceService } from 'src/app/service/cab-service.service';
import { driverRegisterDto } from 'src/app/Model/driverRegister.model';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewdriver',
  templateUrl: './addnewdriver.component.html',
  styleUrls: ['./addnewdriver.component.css'],
})
export class AddnewdriverComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  private driverRegisterSubsription: Subscription;

  addNewDriver: driverRegisterDto = {
    driverName: '',
    driverContact: '',
    driverIdentificationNum: '',
    cabId: 0,
  };

  availableCabs: any[] = [];

  constructor(
    private cabService: CabServiceService,
    private driverService: DriverServiceService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.driverRegisterSubsription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadAvailableCab();
    console.log(this.availableCabs);
  }

  registerDriver() {
    console.log(this.addNewDriver);
    this.driverService.registerDriver(this.addNewDriver).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          this.router.navigateByUrl('/driver');
        } else {
          alert('fail');
        }
      },
      error: (error: any) => {
        alert(error);
      },
      complete: () => {},
    });
  }

  loadAvailableCab() {
    // Use forkJoin to execute both requests in parallel and wait for both to complete
    forkJoin({
      cabs: this.cabService.getAllCab(),
      drivers: this.driverService.getAllDriver(),
    }).subscribe({
      next: (res: any) => {
        if (
          res.cabs.message === 'success' &&
          res.drivers.message === 'success'
        ) {
          const assignId = res.drivers.data.map((driver) => driver.cab?.cabId);

          //console.log(assignId);

          // Filter out cabs that are already assigned
          this.availableCabs = res.cabs.data.filter(
            (cab) => !assignId.includes(cab.cabId)
          );

          //console.log(this.availableCabs);
        } else {
          // Handle error case...
        }
      },
    });
  }
}
