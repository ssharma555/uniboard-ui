import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuildInfo, AutoSuggest, Info } from '@app/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseUrl = 'http://172.23.254.171:2480';
  //baseUrl = 'https://searchink.atlassian.net/rest/api/2/project'
  baseUrl = 'http://localhost:5000/api/v1';
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
    return this.http.get<Info[]>(this.baseUrl + '/build?page=' + page);
  }

  getBuildCount() {
    return this.http.get(this.baseUrl + '/build/summary');
  }

  autoCompleteSuggestion(text: string, context: string) {
    return this.http.get<AutoSuggest[]>(this.baseUrl + '/build/search?text=' + text + '&context=' + context);
  }
}
