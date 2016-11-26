/**
 * Created by DzianisH on 14.11.2016.
 */

import {Component, OnInit} from "@angular/core";
import {RoomService} from "../../services/room.service";
import {Room} from "../../domain/room";

@Component({
    moduleId: module.id,
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit{
    private rooms: Room[] = [];
    private activeRoomId: number = null;

    constructor(
        private roomService: RoomService
    ){}

    ngOnInit(): void {
        const _self = this;
        this.roomService.getUserRooms()
            .then(rooms => this.rooms = rooms)
            .catch(err => this.rooms = []);
    }

    enableRoom(id: number){
        this.activeRoomId = id;
    }
}