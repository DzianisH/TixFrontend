/**
 * Created by DzianisH on 17.11.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
    moduleId: module.id,
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent{

    constructor(
        private userService: UserService
    ){}
}
