import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemDataService {

  constructor(public http: Http) { }

  public getItemData(): Observable<Object> {
    const url = '/api/item-data';

    return this.http
                .get(url)
                .map((response: Response) => response.json())
                .catch(this.handleError);
  }

  private handleError (response: Response | any) {
    return Observable.throw('ItemDataService error');
  }

}
