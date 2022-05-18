import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from './models/result.model';

@Injectable({
  providedIn: 'root'
})
export class SvfService {
  baseUrl;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
  ) { this.baseUrl = baseUrl;}

  run(input): Observable<IResult> {
    return this.http.post<IResult>(this.baseUrl + 'svf', input);
  }

  updateSvf(): Observable<any> {
    return this.http.get(this.baseUrl + 'svf');
  }
}
