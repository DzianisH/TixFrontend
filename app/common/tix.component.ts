/**
 * Created by DzianisH on 07.11.2016.
 */

import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'tix',
    template: `
<header></header>  
<router-outlet></router-outlet>
`
})
export class TixComponent {
}
