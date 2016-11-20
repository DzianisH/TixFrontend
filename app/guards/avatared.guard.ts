/**
 * Created by DzianisH on 20.11.2016.
 */

import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AvatarService} from "../services/avatar.service";

@Injectable()
export class AvataredGuard implements CanActivate{

    constructor(
        private avatarService: AvatarService
    ){}

    canActivate(): Promise<boolean> {
        return this.avatarService.isUserAvatared();
    }

}