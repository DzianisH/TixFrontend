/**
 * Created by DzianisH on 20.11.2016.
 */

import {Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

//TODO: Wrap angular core errors
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
                    _self.logger.logSuccess(res);
                    resolve(res.json());
                })
                .catch(err => {
                    _self.logger.handleError(err);
                    reject(err);
                });
        });
    }

    doPost(uri: string, data: any): Promise<any>{
        const _self = this;
        return new Promise((resolve, reject) => {
            _self.http
                .post(
                    uri,
                    _self.stringifyBody(data),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res =>{
                    _self.logger.logSuccess(res);
                    resolve(res.json());
                })
                .catch(err => {
                    _self.logger.handleError(err);
                    reject(err);
                });
        });
    }

    doPut(uri: string, data: any): Promise<any>{
        const _self = this;
        return new Promise((resolve, reject) => {
            _self.http
                .put(
                    uri,
                    _self.stringifyBody(data),
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res =>{
                    _self.logger.logSuccess(res);
                    resolve(res.json());
                })
                .catch(err => {
                    _self.logger.handleError(err);
                    reject(err);
                });
        });
    }

    doDelete(uri: string): Promise<any>{
        const _self = this;
        return new Promise((resolve, reject) => {
            _self.http
                .delete(
                    uri,
                    {headers: _self.headers}
                )
                .toPromise()
                .then(res =>{
                    _self.logger.logSuccess(res);
                    resolve(res.json());
                })
                .catch(err => {
                    _self.logger.handleError(err);
                    reject(err);
                });
        });
    }

    private stringifyBody(body: any): string{
        if(typeof body === 'undefined') return '';
        return JSON.stringify(body);
    }
}