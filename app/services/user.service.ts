/**
 * Created by DzianisH on 09.11.2016.
 */

import {User} from '../domain/user';


export abstract class UserService{
    abstract isUserAuthorised(): Promise<boolean>;
    abstract getCurrentUser(): Promise<User>;

    abstract isEmailFree(email: string): Promise<boolean>;
    abstract login(email: string, password: string): Promise<User>;
    abstract register(email: string, password: string): Promise<User>;
    abstract logout(): Promise<boolean>;
}