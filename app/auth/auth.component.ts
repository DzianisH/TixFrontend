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
import {errorHandler} from "@angular/platform-browser/src/browser";

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit{
    private canLogin: boolean;
    private canRegister: boolean;

    private checkTerm = new Subject<string>();


    constructor(private userService: UserService){}

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
            .then(user => console.log("SUCCESS  " + user))
            .catch(err => console.error(err));
    }

    register(email: string, password: string): void{
        this.userService.register(email, password)
            .then(user => console.log("SUCCESS  " + user))
            .catch(err => console.error(err));
    }

    checkEmailIsFree(email: string): void{
        this.checkTerm.next(email);
    }
}