import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '@app/services/user.service';
import { ApiService } from '@app/services/api.service';
import { NotificationService } from '@app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  optionValue: any = 'feature';
  userId: string;
  jiraUrl =
    'https://searchink.atlassian.net/CreateIssueDetails!init.jspa?Create=Create&issuetype=TYPE&pid=11418&reporter=USER&assignee=5c3e185552c9026a4847a997';
  bugId = '10202';
  newFeatureId = '10336';

  constructor(
    private formBuilder: FormBuilder,
    private userServise: UserService,
    private apiService: ApiService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<FeedbackComponent>
  ) {}

  ngOnInit() {
    this.userId = this.userServise.getUser()['jira_id'];
    console.log(this.userId);
    this.takeFeedback();
  }

  takeFeedback() {
    this.feedbackForm = this.formBuilder.group({
      feedbackType: new FormControl(''),
      feedbackValue: new FormControl()
    });
  }

  onFeedbackForm() {
    var feedback = this.feedbackForm.value;
    feedback['user'] = this.userId;
    this.apiService.createFeedback(feedback).subscribe(result => {
      this.notification.showNotification('Feedback Submitted Successfully');
      this.dialogRef.close(feedback);
    });
  }
}
