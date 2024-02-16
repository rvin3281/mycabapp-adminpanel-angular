import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/HomeFeature/component/Login/login/login.component';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AddNewCabComponent } from './modules/CabFeature/AddNewCab/add-new-cab/add-new-cab.component';
import { CablistComponent } from './modules/CabFeature/CabList/cablist/cablist.component';
import { EditcabComponent } from './modules/CabFeature/EditCab/editcab/editcab.component';
import { DriverlistComponent } from './modules/DriverFeature/DriverList/driverlist/driverlist.component';
import { AddnewdriverComponent } from './modules/DriverFeature/AddNewDriver/addnewdriver/addnewdriver.component';
import { EditdriverComponent } from './modules/DriverFeature/EditDriver/editdriver/editdriver.component';
import { AddnewtravelComponent } from './modules/TravelFeature/AddNewTravel/addnewtravel/addnewtravel.component';
import { EdittravelComponent } from './modules/TravelFeature/EditTravel/edittravel/edittravel.component';
import { TravellistComponent } from './modules/TravelFeature/TravelList/travellist/travellist.component';
import { RegisterComponent } from './modules/HomeFeature/component/Register/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'travel',
        component: TravellistComponent,
        children: [
          {
            path: 'edittravel/:id',
            component: EdittravelComponent,
          },
        ],
      },
      {
        path: 'addtravel',
        component: AddnewtravelComponent,
      },
      {
        path: 'cab',
        component: CablistComponent,
        children: [
          {
            path: 'editcab/:id',
            component: EditcabComponent,
          },
        ],
      },
      {
        path: 'addcab',
        component: AddNewCabComponent,
      },
      {
        path: 'driver',
        component: DriverlistComponent,
        children: [
          {
            path: 'editdriver/:id',
            component: EditdriverComponent,
          },
        ],
      },
      {
        path: 'adddriver',
        component: AddnewdriverComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
