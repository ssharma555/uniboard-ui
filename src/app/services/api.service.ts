import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuildInfo } from '@app/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://172.23.254.171:2480';
  //baseUrl = 'https://searchink.atlassian.net/rest/api/2/project'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('root:rootpwd')
    })
  };

  getBuildDetails() {
    return this.http.get<BuildInfo>(this.baseUrl + '/function/omniboard/get_build_details', this.httpOptions);
    //return this.http.get<BuildInfo>(this.baseUrl)
  }
}
