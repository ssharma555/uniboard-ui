import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ApiService } from '@app/services/api.service';
import { AutoSuggest } from '@app/models/api.models';
import { ActionService } from '@app/services/action.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // @ViewChild("q", {static: false}) queryField: MatInput;
  searchResults: AutoSuggest[] = [];
  usersForm: FormGroup;
  isLoading = false;
  autoSuggestSub: Subscription;
  isInitialized: boolean = false;
  value: any = null;
  searchQuery = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private actionService: ActionService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    });

    this.usersForm
      .get('userInput')
      .valueChanges.pipe(
        debounceTime(300),
        tap(value => {
          console.log('Value to query = ', value);
          this.isLoading = true;
          this.searchQuery = value;
        }),
        switchMap(value => {
          return this.apiService.autoCompleteSuggestion(value, 'build').pipe(
            finalize(() => {
              this.isLoading = false;
              this.isInitialized = true;
            })
          );
        })
      )
      .subscribe(suggestion => {
        console.log('Search Happened');
        this.searchResults = suggestion;
      });
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit')
    // this.queryField.focus();
  }

  displayFn(searchResults: AutoSuggest) {
    if (searchResults) {
      return searchResults.key + ' = ' + searchResults.value;
    }
  }

  selectedOption(result: any) {
    console.log('Selected option', result);
    console.log('Emitting event');
    this.actionService.searchQuery.emit(result);
  }

  removedQuery() {
    this.value = '';
    console.log('Removed Search');
    console.log('Emitting event');
    this.actionService.searchQuery.emit(null);
  }
}
