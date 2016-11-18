
import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css']
})
export class RoomComponent{
    private dummyMessages = ["hello world!", "hey ya", "all works fine!"];
}