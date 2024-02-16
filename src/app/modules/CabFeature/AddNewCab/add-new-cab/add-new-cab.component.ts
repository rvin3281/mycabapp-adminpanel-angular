import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addnewcab } from 'src/app/Model/AddCab.model';
import { CabServiceService } from 'src/app/service/cab-service.service';

@Component({
  selector: 'app-add-new-cab',
  templateUrl: './add-new-cab.component.html',
  styleUrls: ['./add-new-cab.component.css'],
})
export class AddNewCabComponent implements OnDestroy {
  constructor(private cabService: CabServiceService, private router: Router) {}

  private subsription: Subscription;

  addcab: addnewcab = {
    cabName: '',
    cabModel: '',
    cabPlateNum: '',
  };

  addNewCab() {
    this.subsription = this.cabService.registerCab(this.addcab).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          alert('success');
          this.router.navigateByUrl('/cab');
        } else {
          alert('fail');
        }
      },
      error: (error: any) => {
        console.log(`Error: ${error}`);
      },
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.subsription?.unsubscribe;
  }
}
