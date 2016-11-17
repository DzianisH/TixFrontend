/**
 * Created by DzianisH on 17.11.2016.
 */


import {Injectable, OnInit}    from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';
import {UserService} from "./user.service";


@Injectable()
export class UserServiceImpl extends UserService implements OnInit{
    private loginUri = "/api/login";
    private logoutUri = "/api/logout";
    private userUri = "/api/user";
    private currentUser: User = undefined;


    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){
        super();
    }

    ngOnInit(): void {
        this.fetchCurrentUser();
    }

    isUserAuthorised(): Promise<boolean>{
        var _self = this;
        return new Promise(function (resolve, reject) {
            _self.getCurrentUser()
                .then(res => resolve(res !== null))
                .catch(err => resolve(false));
        });
    }

    getCurrentUser():Promise<User>{
        var user = this.currentUser;
        if (typeof user === 'undefined') {
            console.log("user is undefined yet");
            return this.fetchCurrentUser();
        }
        else {
            console.log("return user promise");
            return new Promise(function (resolve, reject) {
                resolve(user);
            });
        }
    }

    login(email: string, password: string): Promise<User>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .post(
                    _self.loginUri,
                    JSON.stringify({email: email, password: password}),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    var user: User = res.json();
                    _self.authorizeUser(user);
                    resolve(user);
                    UserServiceImpl.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    UserServiceImpl.handleError(err);
                });
        });
    }

    register(email: string, password: string): Promise<User>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .post(
                    _self.userUri,
                    JSON.stringify({email: email, password: password}),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    var user: User = res.json();
                    _self.authorizeUser(user);
                    resolve(user);
                    UserServiceImpl.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    UserServiceImpl.handleError(err);
                });
        });
    }

    isEmailFree(email: string): Promise<boolean>{
        var _self = this;
        return new Promise(function (resolve, reject) {
            if(typeof email === 'undefined' || email === null || email === ''){
                reject("Can't be null!");
            } else {
                _self.http
                    .get(
                        `${_self.userUri}/${email}/free`
                    )
                    .toPromise()
                    .then(res => {
                        resolve(res.json());
                        UserServiceImpl.logSuccess(res);
                    })
                    .catch(err => {
                        reject(err);
                        UserServiceImpl.handleError(err)
                    })
            }
        });
    }

    logout(): Promise<boolean>{
        var _self = this;
        return new Promise(function(resolve) {
            _self.http
                .post(
                    _self.logoutUri,
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    _self.unauthorizeUser();
                    resolve(res.json());
                    UserServiceImpl.logSuccess(res);
                })
                .catch(err => {
                    resolve(false);
                    UserServiceImpl.handleError(err);
                })
        });
    }

    private fetchCurrentUser(): Promise<User>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .get(_self.userUri)
                .toPromise()
                .then(res => {
                    var user: User = res.json();
                    _self.authorizeUser(user);
                    resolve(user);
                    UserServiceImpl.logSuccess(res);
                })
                .catch(err => {
                    _self.unauthorizeUser();
                    reject(err);
                    UserServiceImpl.handleError(err);
                });
        });
    }

    private authorizeUser(newUser: User): void{
        if(typeof newUser === 'undefined') newUser = null;
        this.currentUser = newUser;
    }

    private unauthorizeUser(): void{
        this.authorizeUser(null);
    }

    private static logSuccess(res: any){
        console.log(res);
    }

    private static handleError(err: any){
        console.error(err);
    }
}