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
        if(email === undefined || email === null || email === ''){
            return Promise.reject("can't be null or empty");
        }
        return this.http
            .get(
                `${this.registerUri}/${email}/free`
            )
            .toPromise()
            .then(res => {
                this.logSuccess(res);
                return res.json();
            })
            .catch(this.handleError)
    }

    private logSuccess(res: any){
        console.log("Returned Success: " + res);
        console.log("Response data: " + JSON.stringify(res.json()));
    }

    private handleError(err: any){
        console.log("Returned Error: " + err);
    }
}