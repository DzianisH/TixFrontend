/**
 * Created by DzianisH on 26.11.2016.
 */

import {Injectable} from "@angular/core";
import {Room} from "../domain/room";

@Injectable()
export class RoomService {
    getUserRooms(): Promise<Room[]>{
        return new Promise((resolve, reject) => {
            let rooms: Room[] = [
                {id: 1, title: 'math'},
                {id: 2, title: 'kitties'},
                {id: 4, title: 'freedom'},
                {id: 5, title: 'Spanish'},
                {id: 9, title: 'Angular'}
            ];
            resolve(rooms);
        });
    }
}