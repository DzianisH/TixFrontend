/**
 * Created by DzianisH on 07.11.2016.
 */

import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'tix',
    template: `
<header></header>  
<router-outlet></router-outlet>
`
})
export class TixComponent implements OnInit{
    private authPage = '/auth';
    private chatPage = '/chat';

    constructor(
        private userService: UserService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.userService.isUserAuthorised().then(auth =>{
            console.log(auth);
            console.log("User authorised: " + auth);
            // if(!auth){
            //     this.router.navigateByUrl(this.authPage);
            // } else {
            //     this.router.navigateByUrl(this.chatPage);
            // }
        });
    }
}
