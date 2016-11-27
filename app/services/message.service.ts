/**
 * Created by DzianisH on 27.11.2016.
 */

import {Injectable, OnInit} from '@angular/core';

// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';

var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

@Injectable()
export class MessageService implements OnInit{
    stompClient: any;
    // private SockJS: any = null; // require('sockjs-client/lib/entry.js');
    // private Stomp: any = null;// require('stompjs/index.js');

    send(data: any):void {
        this.stompClient.send('/echo', {}, JSON.stringify(data));
    }

    ngOnInit(): void {
        this.connect();
    }

    connect() {
        const _self = this;
        const socket = new SockJS('/echo');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            _self.stompClient.subscribe('/output/echo', function (echoMessage) {
                // call subscribers
                console.log('Receive: ' + echoMessage)
            });
        }, function (err) {
            console.log('err', err);
        });
    }

}