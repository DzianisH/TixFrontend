/**
 * Created by DzianisH on 17.11.2016.
 */

import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../domain/user";

@Component({
    moduleId: module.id,
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit{
    private isAuthorised: boolean = false;

    constructor(
        private userService: UserService
    ){}

    ngOnInit(): void{
        this.userService.isUserAuthorised()
            .then(res => this.isAuthorised = res)
            .catch(err => this.isAuthorised = false);
    }
}
