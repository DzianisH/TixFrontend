/**
 * Created by DzianisH on 07.11.2016.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./component/auth/auth.component"
import {ChatPageComponent} from "./component/chat/chat-page.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {HomePageComponent} from "./component/default/home-page.component";
import {AvataredGuard} from "./guards/avatared.guard";

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '',  component: HomePageComponent, pathMatch: 'full'},
    { path: 'auth',  component: AuthComponent},
    { path: 'chat', component: ChatPageComponent, canActivate: [LoggedInGuard]} // TODO: use AvataredGuard
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class TixRoutingModule {

}
