import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-release-details',
  templateUrl: './release-details.component.html',
  styleUrls: ['./release-details.component.scss']
})
export class ReleaseDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private titleService: Title,
    public dialog: MatDialog
  ) {}
  routerSub: Subscription;
  id: string;
  releaseDetails: Release;
  timeLine: any[];
  documents: any[] = [];
  artifacts: any[] = [];
  jiraSource: any[] = [];
  displayedColumns = ['key', 'value'];
  users: any[] = [];

  releaseDetailsSub: Subscription;
  jiraDetailsSub: Subscription;
  userListSub: Subscription;

  jiraSectionLoading: boolean = false;
  userSectionLoading: boolean = false;

  progress = 0;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  commitSource = [
    {
      name: 'omnius-api',
      value: 30
    },
    {
      name: 'page2json',
      value: 22
    },
    {
      name: 'trainer application',
      value: 14
    },
    {
      name: 'omnius-pipeline',
      value: 14
    },
    {
      name: 'CV classification',
      value: 2
    },
    {
      name: 'entity prediction',
      value: 1
    },
    {
      name: 'text recognition',
      value: 1
    },
    {
      name: 'db-library',
      value: 1
    }
  ];

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(routeParams => {
      this.id = routeParams['id'];

      this.releaseDetailsSub = this.apiService.getReleaseDetails(this.id).subscribe(release => {
        console.log(release);
        this.titleService.setTitle(release.releaseName);
        this.jiraSectionLoading = true;
        this.releaseDetails = release;
        this.jiraDetailsSub = this.apiService
          .getReleaseJira(this.releaseDetails.releaseTag)
          .subscribe((jira: any[]) => {
            this.jiraSource = jira;

            this.jiraSectionLoading = false;
          });

        this.userSectionLoading = true;
        this.userListSub = this.apiService
          .getUsersForReleaseJira(this.releaseDetails.releaseTag)
          .subscribe((users: any[]) => {
            this.users = users;
            this.userSectionLoading = false;
          });
        this.formatData();
      });
    });
  }

  ngOnDestroy() {
    this.releaseDetailsSub.unsubscribe();
    this.jiraDetailsSub.unsubscribe();
  }

  getPhaseStatus(prevDate: Date, date: Date, nextDate: Date) {
    var prev = new Date(prevDate).getTime();
    var actualDate = new Date(date).getTime();
    var next = new Date(nextDate).getTime();
    var currDate = new Date().getTime();
    if (actualDate < currDate) {
      return 'completed';
    } else if (currDate < next && currDate > prev) {
      return 'inprogress';
    } else {
      return 'waiting';
    }
  }

  getDiffBetweenDates(date1: any, date2: any) {
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  formatData() {
    this.timeLine = [
      {
        name: 'Requirement Gathering',
        date: this.releaseDetails.requirementFreeze,
        status: this.getPhaseStatus(
          new Date('01 Jan 1970 00:00:00 GMT'),
          this.releaseDetails.requirementFreeze,
          this.releaseDetails.featureFreeze
        ),
        showArrow: true
      },
      {
        name: 'Feature Development',
        date: this.releaseDetails.featureFreeze,
        status: this.getPhaseStatus(
          this.releaseDetails.requirementFreeze,
          this.releaseDetails.featureFreeze,
          this.releaseDetails.codeFreeze
        ),
        showArrow: true
      },
      {
        name: 'Product Testing',
        date: this.releaseDetails.codeFreeze,
        status: this.getPhaseStatus(
          this.releaseDetails.featureFreeze,
          this.releaseDetails.codeFreeze,
          this.releaseDetails.releaseDate
        ),
        showArrow: true
      },
      {
        name: 'Product Release',
        date: this.releaseDetails.releaseDate,
        status: this.getPhaseStatus(this.releaseDetails.codeFreeze, this.releaseDetails.releaseDate, new Date()),
        showArrow: false
      }
    ];

    var count = 0;
    var delta = 0;
    for (var i = 0; i < this.timeLine.length - 1; i++) {
      var phase = this.timeLine[i];
      var nextPhase = this.timeLine[1 + 1];
      if (phase.status == 'waiting') {
        continue;
      }
      if (phase.status == 'completed') {
        count += 1;
      } else if (phase.status == 'inprogress') {
        delta =
          (this.getDiffBetweenDates(new Date(), new Date(this.timeLine[i - 1].date)) /
            this.getDiffBetweenDates(new Date(nextPhase.date), new Date(this.timeLine[i - 1].date))) *
          100;
      }
    }

    this.progress = count * 25 + delta * 0.25;
    console.log(count, '    ', delta, '    ', this.progress);

    if (this.releaseDetails.requirementDocument) {
      this.documents.push({ name: 'Requirement Documents', url: this.releaseDetails.requirementDocument });
    }
    if (this.releaseDetails.releaseNote) {
      this.documents.push({ name: 'Release Note', url: this.releaseDetails.releaseNote });
    }

    this.artifacts.push({ name: 'Release Build - 1.1.0-feature-test17', url: 'https://code.omnius.corp/' });
  }

  onSelect(data: any) {
    var url =
      'https://searchink.atlassian.net/issues/?jql=labels in (' +
      this.releaseDetails.releaseTag +
      ') and status  = "' +
      data['name'] +
      '"';
    window.open(url);
  }

  releaseProduct() {
    this.apiService.putRelase(this.id).subscribe();
  }

  confirmDialog(): void {
    const message = 'Are you sure you want Release ';
    const secMessage = this.releaseDetails.releaseName;

    const dialogData = new ConfirmDialogModel('Release - ' + secMessage, message, secMessage);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '800px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      var result = dialogResult;
      if (result) {
        this.releaseProduct();
      }
    });
  }
}
