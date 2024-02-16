import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/HomeFeature/component/Login/login/login.component';
import { AddNewCabComponent } from './modules/CabFeature/AddNewCab/add-new-cab/add-new-cab.component';
import { CablistComponent } from './modules/CabFeature/CabList/cablist/cablist.component';
import { EditcabComponent } from './modules/CabFeature/EditCab/editcab/editcab.component';
import { AddnewdriverComponent } from './modules/DriverFeature/AddNewDriver/addnewdriver/addnewdriver.component';
import { DriverlistComponent } from './modules/DriverFeature/DriverList/driverlist/driverlist.component';
import { EditdriverComponent } from './modules/DriverFeature/EditDriver/editdriver/editdriver.component';
import { RegisterComponent } from './modules/HomeFeature/component/Register/register/register.component';
import { AddnewtravelComponent } from './modules/TravelFeature/AddNewTravel/addnewtravel/addnewtravel.component';
import { EdittravelComponent } from './modules/TravelFeature/EditTravel/edittravel/edittravel.component';
import { TravellistComponent } from './modules/TravelFeature/TravelList/travellist/travellist.component';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddNewCabComponent,
    CablistComponent,
    EditcabComponent,
    AddnewdriverComponent,
    DriverlistComponent,
    EditdriverComponent,
    RegisterComponent,
    AddnewtravelComponent,
    EdittravelComponent,
    TravellistComponent,
    LayoutComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
