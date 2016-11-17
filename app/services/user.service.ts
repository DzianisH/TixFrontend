/**
 * Created by DzianisH on 09.11.2016.
 */


import {Injectable, OnInit}    from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';


@Injectable()
export abstract class UserService extends OnInit{
    abstract ngOnInit();

    abstract isUserAuthorised(): Promise<boolean>|boolean;

    abstract checkUserAuthorised(): Promise<boolean>;

    abstract login(email: string, password: string): Promise<User>;

    abstract register(email: string, password: string): Promise<User>;

    abstract isEmailFree(email: string): Promise<boolean>;

    abstract logout(): Promise<boolean>;
}