/**
 * Created by DzianisH on 06.11.2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TixRoutingModule } from './tix-routing.module';
import { TixComponent }         from './common/tix.component';
import {HeaderComponent} from "./common/header.component";
import {UserService} from './services/user.service';
import {AuthComponent} from "./auth/auth.component";
import {LogoutComponent} from "./common/logout.component";
import {ChatPageComponent} from "./main/chat-page.component";
import {LoggedInGuard} from "./auth/logged-in.guard";


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
        LogoutComponent,
        ChatPageComponent
    ],
    providers: [
        UserService,
        LoggedInGuard,
        Location
    ],
    bootstrap: [ TixComponent ]
})
export class TixModule { }

