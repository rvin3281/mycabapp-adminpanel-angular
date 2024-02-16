import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { cabdto } from 'src/app/Model/cabdto.model';
import { CabServiceService } from 'src/app/service/cab-service.service';

@Component({
  selector: 'app-editcab',
  templateUrl: './editcab.component.html',
  styleUrls: ['./editcab.component.css'],
})
export class EditcabComponent implements OnInit, OnDestroy {
  private loadUserByIdSubscription: Subscription;
  private updateCabSubscription: Subscription;
  cabId: Number;
  loadCabDataById: cabdto = {
    cabId: 0,
    cabModel: '',
    cabName: '',
    cabPlateNum: '',
  };

  constructor(
    private route: ActivatedRoute,
    private cabService: CabServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserByIdSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          this.cabId = params['id'];
          return this.cabService.getCabbyId(this.cabId);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            if (res && res.data) {
              this.loadCabDataById.cabId = res.data.cabId;
              this.loadCabDataById.cabModel = res.data.cabModel;
              this.loadCabDataById.cabName = res.data.cabName;
              this.loadCabDataById.cabPlateNum = res.data.cabPlateNum;
            }
          } else {
            alert('fail');
          }
        },
        error: (error: any) => {
          alert(error);
        },
      });
  }

  updateCab() {
    this.updateCabSubscription = this.cabService
      .updateCab(this.cabId, this.loadCabDataById)
      .subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            this.router.navigateByUrl(`/cab`);
          }
        },
        error: (error: any) => {
          alert('error');
        },
      });
  }

  ngOnDestroy(): void {
    this.loadUserByIdSubscription?.unsubscribe();
    this.updateCabSubscription?.unsubscribe();
  }
}
