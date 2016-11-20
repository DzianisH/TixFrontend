/**
 * Created by DzianisH on 20.11.2016.
 */

import {Injectable} from "@angular/core";
@Injectable()
export class LoggingService{
    logSuccess(res: any){
        console.log(res);
    }

    handleError(err: any){
        console.error(err);
    }
}