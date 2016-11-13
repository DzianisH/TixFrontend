/**
 * Created by DzianisH on 09.11.2016.
 */


import { Injectable }    from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';


@Injectable()
export class UserService {
    private loginUri = "/api/login";
    private registerUri = "/api/user";


    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    isUserAuthorised(): Promise<boolean>{
        return Promise.resolve(false);
    }

    login(email: string, password: string): Promise<User>{
        return this.http
            .post(
                this.loginUri,
                JSON.stringify({email: email, password: password}),
                {headers: this.headers}
            ).toPromise()
            .then(res => {
                this.logSuccess(res);
                return res.json();
            })
            .catch(this.handleError);
    }

    register(emai: string, password: string): Promise<User>{
        return this.http
            .post(
                this.registerUri,
                JSON.stringify({email: emai, password: password})
            )
            .toPromise()
            .then(res => {
                this.logSuccess(res);
                return res.json();
            })
            .catch(this.handleError);
    }

    isEmailFree(email: string): Promise<boolean>{
        var _this = this;
        return new Promise(function (resolve, reject) {
            if(email === undefined || email === null || email === ''){
                reject("Can't be null!");
            } else {
                _this.http
                    .get(
                        `${_this.registerUri}/${email}/free`
                    )
                    .toPromise()
                    .then(res => {
                        resolve(res.json());
                        _this.logSuccess(res);
                    })
                    .catch(err => {
                        reject(err);
                        _this.handleError(err)
                    })
                    .catch();
            }
        });
    }

    private logSuccess(res: any){
        console.log("Returned Success: " + res);
        // console.log("Response data: " + JSON.stringify(res.json()));
    }

    private handleError(err: any){
        console.log("Returned Error: " + err);
        console.error(err);
    }
}