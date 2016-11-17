/**
 * Created by DzianisH on 17.11.2016.
 */

import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {UserService} from "../services/user.service";

@Injectable()
export class LoggedInGuard implements CanActivate{

    constructor(
        private userService: UserService
    ){}

    canActivate(): Promise<boolean>|boolean {
        let isAuth = this.userService.isUserAuthorised();
        console.log("user authenticated: " + isAuth);
        return isAuth;
    }

}