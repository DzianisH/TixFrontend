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
    private canLogin: boolean = true;
    private canRegister: boolean = true;
    private checkTerm = new Subject<string>();


    constructor(private userService: UserService){}

    ngOnInit(): void {
        this.checkTerm
            .debounceTime(150)        // wait for 150ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(
                term => this.userService.isEmailFree(term)
                    .then(resp => {
                        this.handleResponse(resp);
                    })
                    .catch(err => {
                        this.handleError(err);
                    })
            ).toPromise();
        this.checkTerm.next(null);
    }

    private handleResponse(res: boolean): boolean{
        if(res != null) {
            this.canLogin = res;
            this.canRegister = !res;
            console.log(this.canLogin + " " + this.canRegister);
        } else {
            this.canLogin = false;
            this.canRegister = false;
            console.log("Response is null!");
        }
        return res;
    }

    private handleError(error){
        console.log("Unexpected error occurred " + error);
        this.canLogin = false;
        this.canRegister = false;
    }

    login(email: string, password: string): void{
        this.userService.login(email, password)
            .then(user => console.log("SUCCESS  " + user))
            .catch(err => console.log("ERROR " + err));
    }

    register(email: string, password: string): void{
        this.userService.register(email, password)
            .then(user => console.log("SUCCESS  " + user))
            .catch(err => console.log("ERROR " + err));
    }

    checkEmailIsFree(email: string): void{
        this.checkTerm.next(email);
    }
}