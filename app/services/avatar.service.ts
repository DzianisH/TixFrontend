/**
 * Created by DzianisH on 20.11.2016.
 */

import {Avatar} from "../domain/avatar";

export abstract class AvatarService{
    abstract isUserAvatared(): Promise<boolean>;
    abstract getCurrentAvatar(): Promise<Avatar>;

    abstract getUserAvatarList(): Promise<Avatar[]>;
    abstract useAvatar(avatar: Avatar): Promise<Avatar>;
    abstract createAvatar(avatar: Avatar): Promise<Avatar>;
    abstract deleteAvatar(avatar: Avatar): Promise<boolean>;
}