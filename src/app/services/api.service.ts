import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuildInfo, AutoSuggest } from '@app/models/api.models';

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

  getBuildDetails(sort_order: string, page: number) {
    sort_order = sort_order ? sort_order : 'asc';
    console.log(sort_order);
    return this.http.get<BuildInfo>(
      this.baseUrl + '/function/omniboard/get_build_details/' + page + '/' + sort_order,
      this.httpOptions
    );
  }

  getBuildCount() {
    return this.http.get(this.baseUrl + '/function/omniboard/get_build_count/', this.httpOptions);
  }

  autoCompleteSuggestion(text: string) {
    return this.http.get<AutoSuggest[]>(this.baseUrl + '/function/omniboard/auto_suggest/' + text, this.httpOptions);
  }
}
