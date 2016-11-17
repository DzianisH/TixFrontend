/**
 * Created by DzianisH on 09.11.2016.
 */


import {Injectable, OnInit}    from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../domain/user';


@Injectable()
export abstract class UserService extends OnInit{
    abstract isUserAuthorised(): Promise<boolean>;
    abstract getCurrentUser(): Promise<User>;

    abstract isEmailFree(email: string): Promise<boolean>;
    abstract login(email: string, password: string): Promise<User>;
    abstract register(email: string, password: string): Promise<User>;
    abstract logout(): Promise<boolean>;
}