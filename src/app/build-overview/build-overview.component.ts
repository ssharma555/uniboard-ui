import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@app/services/api.service';
import { Info, AutoSuggest, Filter } from '@app/models/api.models';
import { startWith, switchMap, map, share, mergeMap } from 'rxjs/operators';
import { merge, Subscription, forkJoin } from 'rxjs';
import { ActionService } from '@app/services/action.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-build-overview',
  templateUrl: './build-overview.component.html',
  styleUrls: ['./build-overview.component.scss']
})
export class BuildOverviewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: Info[];
  isLoadingResults: boolean;
  buildCount: number;
  filter: Filter;

  tableSubscription: Subscription;
  autoSuggestSub: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['build_number', 'commit_id', 'author', 'status', 'test_summary', 'build_date'];
  report_portal_url =
    'http://172.23.255.183:8080/ui/#api_test/launches/all%7Cpage.page=1&page.size=50&page.sort=start_time,number%2CDESC/launch_id?page.page=1&page.size=50&filter.eq.has_childs=false&filter.in.status=FAILED%2CINTERRUPTED&filter.in.type=STEP&page.sort=start_time%2CASC';

  constructor(private apiService: ApiService, private actionService: ActionService) {}

  ngOnInit() {
    this.autoSuggestSub = this.actionService.searchQuery.subscribe((query: AutoSuggest) => {
      console.log('Received in Build Overview = ', query);
      this.filter = query;
    });

    // this.actionService.contextEmitter.emit('build');
  }

  ngOnDestroy() {
    this.autoSuggestSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.tableSubscription = this.initializeTableDate().subscribe(finalInfo => {
      this.dataSource = finalInfo['data'];
      this.buildCount = finalInfo['count']['total'];

      console.log('Result from query', this.dataSource, this.buildCount);
    });
  }

  initializeTableDate() {
    return merge(this.sort.sortChange, this.paginator.page, this.actionService.searchQuery).pipe(
      startWith({}),
      switchMap(() =>
        this.apiService.getBuildDetails(this.sort.direction, this.paginator.pageIndex, this.filter).pipe(
          mergeMap(buildInfo => {
            return this.apiService.getBuildCount(this.filter).pipe(
              map((c: number) => {
                const finalInfo = {
                  data: buildInfo,
                  count: c
                };
                return finalInfo;
              })
            );
          })
        )
      )
    );
  }

  // refreshContent() {
  //   console.log('refresh the content')
  //   this.tableSubscription.unsubscribe();
  //   this.tableSubscription = this.initializeTableDate().subscribe(data => this.dataSource = data)
  // }
}
