import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BuildOverviewDataSource, BuildOverviewItem } from './build-overview-datasource';
import { ApiService } from '@app/services/api.service';
import { BuildInfo } from '@app/models/api.models';

@Component({
  selector: 'app-build-overview',
  templateUrl: './build-overview.component.html',
  styleUrls: ['./build-overview.component.scss']
})
export class BuildOverviewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<BuildOverviewItem>;
  dataSource = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['build_number', 'commit_id', 'author', 'status', 'test_summary', 'build_date', 'star'];
  report_portal_url =
    'http://172.23.255.183:8080/ui/#api_test/launches/all%7Cpage.page=1&page.size=50&page.sort=start_time,number%2CDESC/launch_id?page.page=1&page.size=50&filter.eq.has_childs=false&filter.in.status=FAILED%2CINTERRUPTED&filter.in.type=STEP&page.sort=start_time%2CASC';
  constructor(private apiService: ApiService) {}

  getBuildInfo() {
    this.apiService.getBuildDetails().subscribe(x => {
      console.log(x);
      this.dataSource = new MatTableDataSource(x.result);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.getBuildInfo();
    this.dataSource = new MatTableDataSource();
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
}
