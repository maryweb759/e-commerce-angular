import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingFormComponent } from './components/shopping-form/shopping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShredModule } from '../shred/shred.module';
@NgModule({ 
    declarations: [
        CheckOutComponent,
        CheckoutSummaryComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        ShoppingCartComponent,
        ShoppingFormComponent,
       
    ], 
    imports: [
        CommonModule,
        RouterModule,
        ShredModule,
        FormsModule,
    ]
}) 

export class ShoppingModule { }