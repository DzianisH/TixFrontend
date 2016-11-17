/**
 * Created by DzianisH on 09.11.2016.
 */


import {Injectable, OnInit}    from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';


@Injectable()
export class UserService implements OnInit{
    private loginUri = "/api/login";
    private logoutUri = "/api/logout";
    private userUri = "/api/user";
    private currentUser: User = null;

    isAuthorised: boolean = false;


    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    ngOnInit(): void {
        this.isUserAuthorised()
            .then(res => this.isAuthorised = res)
            .catch(err => this.isAuthorised = false);
    }

    isUserAuthorised(): Promise<boolean>{
        var _self = this;
        return new Promise(function (resolve, reject) {
            if(_self.currentUser !== null){
                resolve(true);
            } else {
                _self.http
                    .get(_self.userUri)
                    .toPromise()
                    .then(res => {
                        UserService.logSuccess(res);
                        var user: User = res.json();
                        _self.authorizeUser(user);
                        resolve(true);
                        return user;
                    })
                    .catch(err => {
                        // UserService.handleError(err);
                        // reject(err);
                        reject(false);
                    });
            }
        });
    }

    private authorizeUser(newUser: User): void{
        if(newUser === undefined) newUser = null;
        this.currentUser = newUser;
        this.isAuthorised = newUser !== null;
    }

    private unauthorizeUser(): void{
        this.authorizeUser(null);
    }

    login(email: string, password: string): Promise<User>{
        var _self = this;
        return this.http
            .post(
                this.loginUri,
                JSON.stringify({email: email, password: password}),
                {headers: _self.headers}
            )
            .toPromise()
            .then(res => {
                UserService.logSuccess(res);
                var user: User = res.json();
                _self.authorizeUser(user);
                return res.json();
            })
            .catch(err => {
                UserService.handleError(err);
            });
    }

    register(email: string, password: string): Promise<User>{
        var _self = this;
        return this.http
            .post(
                this.userUri,
                JSON.stringify({email: email, password: password}),
                {headers: _self.headers}
            )
            .toPromise()
            .then(res => {
                UserService.logSuccess(res);
                var user: User = res.json();
                _self.authorizeUser(user);
                return res.json();
            })
            .catch(err => {
                UserService.handleError(err);
            });
    }

    isEmailFree(email: string): Promise<boolean>{
        var _self = this;
        return new Promise(function (resolve, reject) {
            if(email === undefined || email === null || email === ''){
                reject("Can't be null!");
            } else {
                _self.http
                    .get(
                        `${_self.userUri}/${email}/free`
                    )
                    .toPromise()
                    .then(res => {
                        resolve(res.json());
                        UserService.logSuccess(res);
                    })
                    .catch(err => {
                        reject(err);
                        UserService.handleError(err)
                    })
                    .catch();
            }
        });
    }

    logout(): Promise<boolean>{
        var _self = this;
        return this.http
            .post(
                this.logoutUri,
                {headers: this.headers}
            )
            .toPromise()
            .then(res => {
                UserService.logSuccess(res);
                _self.unauthorizeUser();
                return res.json();
            })
    }

    private static logSuccess(res: any){
        console.log("Returned Success: " + res);
        // console.log("Response data: " + JSON.stringify(res.json()));
    }

    private static handleError(err: any){
        console.log("Returned Error: " + err);
        console.error(err);
    }
}