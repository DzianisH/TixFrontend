/**
 * Created by DzianisH on 06.11.2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TixRoutingModule } from './tix-routing.module';
import { TixComponent }         from './component/tix.component';
import {HeaderComponent} from "./component/common/header.component";
import {UserService} from './services/user.service';
import {AuthComponent} from "./component/auth/auth.component";
import {LogoutComponent} from "./component/common/logout.component";
import {ChatPageComponent} from "./component/chat/chat-page.component";
import {LoggedInGuard} from "./component/auth/logged-in.guard";
import {HomePageComponent} from "./component/default/home-page.component";


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
        ChatPageComponent,
        HomePageComponent
    ],
    providers: [
        UserService,
        LoggedInGuard,
        Location
    ],
    bootstrap: [ TixComponent ]
})
export class TixModule { }

