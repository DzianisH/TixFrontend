/**
 * Created by DzianisH on 07.11.2016.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {TixComponent} from "./tix.component";
import {ChatPageComponent} from "./main/chat-page.component";

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '',  component: TixComponent },
    { path: 'auth',  component: AuthComponent },
    { path: 'chat', component: ChatPageComponent    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class TixRoutingModule {

}
