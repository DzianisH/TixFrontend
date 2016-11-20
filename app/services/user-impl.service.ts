/**
 * Created by DzianisH on 17.11.2016.
 */


import {Injectable, OnInit}    from '@angular/core';

import {User} from '../domain/user';
import {UserService} from "./user.service";
import {GenericHttpService} from "./generic-http.service";

@Injectable()
export class UserServiceImpl extends UserService implements OnInit{
    private loginUri = "/api/login";
    private logoutUri = "/api/logout";
    private userUri = "/api/user";
    private currentUser: User = undefined;

    constructor(
        private httpService: GenericHttpService
    ){
        super();
    }

    ngOnInit(): void {
        this.fetchCurrentUser()
            .then(user => {
                this.authorizeUser(user);
            })
            .catch(err => {
                this.unauthorizeUser();
            });
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
        var _self = this;
        if (typeof _self.currentUser !== 'undefined') {
            console.log("return user promise");
            return new Promise(function (resolve, reject) {
                resolve(_self.currentUser);
            });
        }
        else {
            console.log("user is undefined yet");
            return new Promise((resolve, reject) =>{
                this.fetchCurrentUser()
                    .then(user => {
                        _self.authorizeUser(user);
                        resolve(user);
                    })
                    .catch(err => {
                        _self.unauthorizeUser();
                        reject(err);
                    });
            });
        }
    }

    login(email: string, password: string): Promise<User>{
        return this.authTemplate(this.loginUri, <User>{email: email, password: password});
    }

    register(email: string, password: string): Promise<User>{
        return this.authTemplate(this.userUri, <User>{email: email, password: password});
    }

    private authTemplate(uri: string, user: User): Promise<User>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.httpService.doPost(uri, user)
                .then(user => {
                    _self.authorizeUser(user);
                    resolve(user);
                })
                .catch(err => reject(err));
        });
    }

    isEmailFree(email: string): Promise<boolean>{
        if(typeof email === 'undefined' || email === null || email === ''){
            return new Promise((resolve, reject) => reject("Can't be null"));
        }
        return this.httpService.doGet(`${this.userUri}/${email}/free`);
    }

    logout(): Promise<boolean>{
        var _self = this;
        return new Promise((resolve, reject) => {
            this.httpService.doPost(this.logoutUri, undefined)
                .then(res => {
                    if(res === true){
                        _self.unauthorizeUser();
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => resolve(false));
        });
    }

    private authorizeUser(newUser: User): void{
        if(typeof newUser === 'undefined') newUser = null;
        this.currentUser = newUser;
    }

    private unauthorizeUser(): void{
        this.authorizeUser(null);
    }

    private fetchCurrentUser(): Promise<User>{
        return this.httpService.doGet(this.userUri);
    }
}