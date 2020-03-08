import { Injectable, Output, EventEmitter } from '@angular/core';
import { AutoSuggest } from '@app/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor() {}

  public searchQuery = new EventEmitter<AutoSuggest>();
}
