/**
 * Created by DzianisH on 14.11.2016.
 */
import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component'],
    selector: 'logout'
})
export class LogoutComponent implements OnInit{
    private isAuthorised: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.fetchIsAuth();
    }

    fetchIsAuth(){
        this.userService.isUserAuthorised()
            .then(res => {
                console.log(res +   "    AAAAAAAAAAAAAAA");
                this.isAuthorised = res;
            })
            .catch(err => this.isAuthorised = false);
    }

    logout(){
        this.userService.logout()
            .then(res => {
                this.isAuthorised = !res;
                this.router.navigateByUrl("/");
            })
            .catch(err => this.isAuthorised = false);
    }
}