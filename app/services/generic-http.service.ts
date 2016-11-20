/**
 * Created by DzianisH on 20.11.2016.
 */

import {Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenericHttpService{
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private logger: LoggingService,
        private http: Http
    ){}

    doGet(url: string): Promise<any>{
        const _self = this;
        return new Promise((resolve, reject) => {
            _self.http
                .get(url)
                .toPromise()
                .then(res =>{
                    resolve(res.json());
                    _self.logger.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    _self.logger.handleError(err);
                });
        });
    }

    doPost(uri: string, data: any): Promise<any>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .post(
                    uri,
                    _self.stringifyBody(data),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    resolve(res.json());
                    _self.logger.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    _self.logger.handleError(err);
                });
        });
    }

    doPut(uri: string, data: any): Promise<any>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .put(
                    uri,
                    _self.stringifyBody(data),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    resolve(res.json());
                    _self.logger.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    _self.logger.handleError(err);
                });
        });
    }

    doDelete(uri: string): Promise<any>{
        var _self = this;
        return new Promise(function(resolve, reject) {
            _self.http
                .delete(
                    uri,
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res => {
                    resolve(res.json());
                    _self.logger.logSuccess(res);
                })
                .catch(err => {
                    reject(err);
                    _self.logger.handleError(err);
                });
        });
    }

    private stringifyBody(body: any): string{
        if(typeof body === 'undefined') return '';
        return JSON.stringify(body);
    }
}