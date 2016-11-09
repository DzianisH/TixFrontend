/**
 * Created by DzianisH on 09.11.2016.
 */


import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';
import {Http, Headers} from '@angular/http';


@Injectable()
export class UserService {
    private url = "http://localhost:5000/api/user";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    isUserAuthorised(): Promise<boolean>{
        return Promise.resolve(false);
    }

    login(email: string, password: string): Promise<User>{
        return this.http
            .put(
                this.url,
                JSON.stringify({email: email, password: password}),
                {headers: this.headers}
            ).toPromise()
            .then(res => {
                console.log("Returned Success: ");
                console.log(res);
                return res.json().data;
            })
            .catch(this.handleError);
    }


    private handleError(err: string){
        console.log("Returned Error: ");
        console.log(err);
    }
}