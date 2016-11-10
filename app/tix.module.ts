/**
 * Created by DzianisH on 06.11.2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TixRoutingModule } from './tix-routing.module';
import { TixComponent }         from './tix.component';
import {HeaderComponent} from "./common/header.component";
import {UserService} from './auth/user.service';
import {AuthComponent} from "./auth/auth.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TixRoutingModule
    ],
    declarations: [
        TixComponent,
        HeaderComponent,
        AuthComponent,
    ],
    providers: [
        UserService,
        Location
    ],
    bootstrap: [ TixComponent ]
})
export class TixModule { }

