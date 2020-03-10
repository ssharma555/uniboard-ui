import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuildInfo, AutoSuggest, Info, Filter, Release } from '@app/models/api.models';

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

  getBuildDetails(sort_order: string, page: number, filter: Filter) {
    sort_order = sort_order ? sort_order : 'asc';
    console.log(sort_order);
    if (filter) {
      return this.http.get<Info[]>(
        this.baseUrl + '/build?page=' + page + '&filter_key=' + filter.key + '&filter_value=' + filter.value
      );
    } else {
      return this.http.get<Info[]>(this.baseUrl + '/build?page=' + page);
    }
  }

  getBuildCount(filter: Filter) {
    if (filter) {
      return this.http.get(
        this.baseUrl + '/build/summary' + '?filter_key=' + filter.key + '&filter_value=' + filter.value
      );
    }
    return this.http.get(this.baseUrl + '/build/summary');
  }

  autoCompleteSuggestion(text: string, context: string) {
    return this.http.get<AutoSuggest[]>(this.baseUrl + '/build/search?text=' + text + '&context=' + context);
  }

  createRelease(release: Release) {
    return this.http.post<string>(this.baseUrl + '/release', release);
  }

  getRelease() {
    return this.http.get<Release[]>(this.baseUrl + '/release');
  }

  getReleaseDetails(id: string) {
    return this.http.get<Release>(this.baseUrl + '/release/' + id);
  }
}
