/**
 * Created by DzianisH on 09.11.2016.
 */
import {Component, OnInit} from "@angular/core";

import {UserService} from "./user.service";
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit{
    private canLogin: boolean;
    private canRegister: boolean;
    private infoText = 'Just fill the above statements to log in.';

    private checkTerm = new Subject<string>();


    constructor(
        private userService: UserService,
        // private location: Location,
        private router: Router
    ){}

    ngOnInit(): void {
        this.checkTerm
            .debounceTime(150)        // wait for 150ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(
                term => this.userService.isEmailFree(term)
                    .then(isEmailFree => {
                        this.canLogin = !isEmailFree;
                        this.canRegister = isEmailFree;
                    })
                    .catch(err => {
                        this.handleError(err);
                    })
            ).toPromise();
    }

    private handleError(error){
        console.log("Unexpected error occurred " + error);
        console.error(error);
        this.canLogin = false;
        this.canRegister = false;
    }

    login(email: string, password: string): void{
        this.userService.login(email, password)
            .then(res => this.handleAuthSuccess(res))
            .catch(err => console.error(err));
    }

    register(email: string, password: string, passwordConfirmation: string): void{
        if(password === passwordConfirmation) {
            console.log(password + "  === " + passwordConfirmation);
            this.userService.register(email, password)
                .then(res => this.handleAuthSuccess(res))
                .catch(err => console.error(err));
        } else {
            // handle me
        }
    }

    checkEmailIsFree(email: string): void{
        this.checkTerm.next(email);
    }

    private handleAuthSuccess(user: any){
        console.log("SUCCESS: " + JSON.stringify(user));
        this.router.navigateByUrl("/chat");
    }
}