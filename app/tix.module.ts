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
import {LogoutComponent} from "./component/auth/logout.component";
import {ChatPageComponent} from "./component/chat/chat-page.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {HomePageComponent} from "./component/default/home-page.component";
import {UserServiceImpl} from "./services/user-impl.service";
import {UserDetailsComponent} from "./component/default/user-details.component";
import {RoomComponent} from "./component/chat/room.component";
import {AvatarService} from "./services/avatar.service";
import {AvatarServiceImpl} from "./services/avatar-impl.service";
import {AvataredGuard} from "./guards/avatared.guard";
import {LoggingService} from "./services/logging.service";
import {GenericHttpService} from "./services/generic-http.service";
import {RoomService} from "./services/room.service";

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
        HomePageComponent,
        UserDetailsComponent,
        RoomComponent
    ],
    providers: [
        {provide: UserService, useClass: UserServiceImpl},
        {provide: AvatarService, useClass: AvatarServiceImpl},
        LoggingService,
        GenericHttpService,
        RoomService,
        LoggedInGuard,
        AvataredGuard,
        Location
    ],
    bootstrap: [ TixComponent ]
})
export class TixModule { }

