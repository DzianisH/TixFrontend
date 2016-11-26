/**
 * Created by DzianisH on 20.11.2016.
 */

import {AvatarService} from "./avatar.service";
import {Avatar} from "../domain/avatar";
import 'rxjs/add/operator/toPromise';
import {Injectable, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {GenericHttpService} from "./generic-http.service";

@Injectable()
export class AvatarServiceImpl extends AvatarService implements OnInit{
    private avatarUri = '/api/avatar';
    private userAvatarUri = '/api/user/avatar';
    private activeAvatarUri = this.userAvatarUri + '/active';
    private currentAvatar: Avatar = undefined;

    private activeAvatar: Avatar = undefined;
    private userAvatarList: Avatar[] = undefined;

    constructor(
        private userService: UserService,
        private httpService: GenericHttpService
    ){
        super();
    }

    ngOnInit(): void {
        this.getCurrentAvatar();
    }

    isUserAvatared(): Promise<boolean> {
        const _self = this;
        return new Promise((resolve, reject) => {
            _self.getCurrentAvatar()
                .then(avatar => resolve(avatar !== null))
                .catch(err => resolve(false))
        })
    }

    getCurrentAvatar(): Promise<Avatar> {
        const _self = this;
        return new Promise((resolve, reject) => {
            let avatar = _self.activeAvatar;
            if(typeof avatar !== 'undefined'){
                resolve(avatar);
            } else {
                _self.httpService.doGet(_self.activeAvatarUri)
                    .then(avatar => {
                        _self.avatarUser(avatar);
                        resolve(avatar);
                    })
                    .catch(err => reject(err));
            }
        });
    }

    getUserAvatarList(): Promise<Avatar[]> {
        const _self = this;
        return new Promise((resolve, reject) => {
            let avatarList = _self.userAvatarList;
            if(typeof avatarList !== 'undefined'){
                resolve(avatarList);
            } else {
                _self.httpService.doGet(_self.userAvatarUri)
                    .then(avatarList => {
                        _self.saveAvatarList(avatarList);
                        resolve(avatarList);
                    })
                    .catch(err => reject(err));
            }
        });
    }

    useAvatar(avatar: Avatar): Promise<Avatar> {
        return undefined;
    }

    createAvatar(avatar: Avatar): Promise<Avatar> {
        return undefined;
    }

    deleteAvatar(avatar: Avatar): Promise<boolean> {
        return undefined;
    }


    private avatarUser(avatar: Avatar){
        if(typeof avatar === 'undefined') avatar = null;
        this.activeAvatar = avatar;
    }

    private unavatarUser(){
        this.avatarUser(null);
    }

    private saveAvatarList(list: Avatar[]){
        if(typeof list === 'undefined') list = null;
        if(list === null) list = [];
        this.userAvatarList = list;
    }
}