/**
 * Created by DzianisH on 17.11.2016.
 */

import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../domain/user";
@Component({
    moduleId: module.id,
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
    private user: User = new User();// new User() fix bind wtfs

    constructor(
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.userService.getCurrentUser().then(res => {
            this.user = res;
        });
    }
}
