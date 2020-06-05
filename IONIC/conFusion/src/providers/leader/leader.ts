import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Leader } from '../../shared/leader';

import { map, catchError } from 'rxjs/operators';
/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider ) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[] | any> {
  	return this.http.get(baseURL + 'leaders')
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getLeader(id: number): Observable<Leader | any> {
  	return this.http.get<Leader>(baseURL + 'leaders/' + id)
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader | any> {
  	return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
  	.pipe(map(res => res[0] ))
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

}