import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ApiService } from '@app/services/api.service';
import { AutoSuggest } from '@app/models/api.models';
import { ActionService } from '@app/services/action.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('context') context: string;
  searchResults: AutoSuggest[] = [];
  usersForm: FormGroup;
  isLoading = false;
  autoSuggestSub: Subscription;
  isInitialized: boolean = false;
  value: any = null;
  searchQuery = '';

  contextSub: Subscription;

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
          return this.apiService.autoCompleteSuggestion(value, this.context).pipe(
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

    // this.contextSub = this.actionService.contextEmitter.subscribe((x: string) => {
    //   console.log('Context ', x)
    //   this.context = x

    // });
  }

  ngOnDestroy() {
    // this.contextSub.unsubscribe();
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
