/**
 * Created by DzianisH on 07.11.2016.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./component/auth/auth.component";
import {TixComponent} from "./component/tix.component";
import {ChatPageComponent} from "./component/chat/chat-page.component";
import {LoggedInGuard} from "./component/auth/logged-in.guard";
import {HomePageComponent} from "./component/default/home-page.component";

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '',  component: HomePageComponent, pathMatch: 'full'},
    { path: 'auth',  component: AuthComponent},
    { path: 'chat', component: ChatPageComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class TixRoutingModule {

}
