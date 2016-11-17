/**
 * Created by DzianisH on 07.11.2016.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {TixComponent} from "./common/tix.component";
import {ChatPageComponent} from "./main/chat-page.component";
import {LoggedInGuard} from "./auth/logged-in.guard";

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '',  component: ChatPageComponent, pathMatch: 'full'},
    { path: 'auth',  component: AuthComponent},
    { path: 'chat', component: ChatPageComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class TixRoutingModule {

}
