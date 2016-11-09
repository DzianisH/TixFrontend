/**
 * Created by DzianisH on 09.11.2016.
 */
import {Component} from "@angular/core";
import {UserService} from "./user.service";

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthorisationComponent{

    constructor(private userService: UserService){}

    login(email: string, password: string): void{
        this.userService.login(email, password)
            .then(user => console.log("SUCCESS  " + user))
            .catch(err => console.log("ERROR " + err));
    }

    register(email: string, password: string): void{

    }
}