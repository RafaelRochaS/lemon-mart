import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { MaterialModule } from '../material.module';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, ReceiptLookupComponent, UserManagementComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class ManagerModule { }
