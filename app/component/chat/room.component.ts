
import {Component, Input, OnInit} from "@angular/core";
import {Room} from "../../domain/room";

@Component({
    moduleId: module.id,
    selector: 'room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
    @Input()
    private room: Room = null;
    private dummyMessages = [];

    ngOnInit(): void {
        this.dummyMessages = [
            "Welcome to " + this.room.title + " room",
            "hello world!",
            "hey ya",
            "all works fine!"
        ];
    }

    send(messageText: string): void{
        console.log('Mock sending message: ' + messageText);
    }
}