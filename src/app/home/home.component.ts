import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/services/user.service';
import { ApiService } from '@app/services/api.service';
import { KeyValueHolder, User } from '@app/models/api.models';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  userId: string;
  jiraTasks: any[] = [];
  isDoughnut = true;
  count: number = 0;
  bitCount: number = 0;
  errMsg = '';
  jiraUrl =
    'https://searchink.atlassian.net/issues/?jql=assignee = ASSIGNEE_PH and project in ("PROJECT_PH") and status not in (Done, Closed, Deployed, "Won\'t Do" , DUPLICATED) ORDER BY createdDate DESC';

  name = this.userService.getUser().name;
  is_token_available = this.userService.getUser().token_present;
  token = '';
  profileImg = this.userService.getUser().profile_img;
  bitLoading = false;

  // view: any[] = [500, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  bitTasks: any[];

  // cardColor: string = '#232837';

  constructor(private userService: UserService, private apiService: ApiService) {}

  ngOnInit() {
    this.userId = this.userService.getUser().jira_id;
    this.apiService.getUserJiraTasks(this.userId).subscribe((tasks: any[]) => {
      this.jiraTasks = tasks;
      for (var task of tasks) {
        this.count += task['value'];
      }
    });

    this.bitLoading = true;
    this.apiService.getBitbucketTasks(this.userId).subscribe(response => {
      this.bitLoading = false;
      this.bitTasks = response;
      this.bitTasks.forEach(x => {
        this.bitCount += x['value'];
      });
      console.log('dummy = ', this.bitTasks);
    });
  }

  onSelect(data: any): void {
    console.log('onSelect', data);
    window.open(this.jiraUrl.replace('ASSIGNEE_PH', this.userId).replace('PROJECT_PH', data['name']));
  }

  updateUser() {
    var body = {};
    body['bitbucket_token'] = this.token;

    this.apiService.updateUser(body, this.userId).subscribe(
      response => {
        this.is_token_available = true;
        this.bitLoading = true;
        this.apiService.getBitbucketTasks(this.userId).subscribe(response => {
          this.bitTasks = response;
          this.is_token_available = true;
          var user: User = this.userService.getUser();
          user.token_present = true;
          this.userService.storeUser(user);
          this.bitLoading = false;
        });
      },
      () => {
        this.is_token_available = false;
        this.errMsg = 'Invalid Token';
        console.log('Error');
      }
    );
  }
}
