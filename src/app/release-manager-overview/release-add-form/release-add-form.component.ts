import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-release-add-form',
  templateUrl: './release-add-form.component.html',
  styleUrls: ['./release-add-form.component.scss'],
  providers: [DatePipe]
})
export class ReleaseAddFormComponent implements OnInit {
  newReleaseForm: FormGroup;
  requirementFreeze: any;
  featureFreeze: string;
  codeFreeze: string;
  uatCompletion: string;
  releaseDate: string;
  errorMessage: string;
  successMessage: string;
  checked = false;
  projects: any[] = [];
  selectedProjects: any = [];

  stringPattern = /^\S*$/;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ReleaseAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Release,
    private nitification: NotificationService
  ) {}

  toolTipDelay = 300;
  ngOnInit() {
    this.apiService.getAllJiraProjects().subscribe((result: any[]) => {
      this.projects = result;
      console.log(this.projects);
    });
    this.createForm();
  }

  getValue(data: any, key: string) {
    if (data) {
      return data[key];
    }

    return '';
  }

  createForm() {
    console.log('Pre populated data = ', this.getValue(this.data, 'id'));
    this.newReleaseForm = this.formBuilder.group({
      releaseName: new FormControl(this.getValue(this.data, 'releaseName'), []),
      releaseTag: new FormControl(this.getValue(this.data, 'releaseTag'), []),
      releaseDescription: new FormControl(),
      associatedProjects: new FormControl(),
      requirementFreeze: new FormControl(this.getValue(this.data, 'requirementFreeze'), Validators.required),
      requirementDocument: new FormControl(this.getValue(this.data, 'requirementDocument'), []),
      featureFreeze: new FormControl(this.getValue(this.data, 'featureFreeze'), Validators.required),
      codeFreeze: new FormControl(this.getValue(this.data, 'codeFreeze'), Validators.required),
      uatCompletion: new FormControl(''),
      releaseDate: new FormControl(this.getValue(this.data, 'releaseDate'), Validators.required),
      releaseNote: new FormControl(this.getValue(this.data, 'releaseNote'))
    });
  }

  convertDateFormat(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  onSubmitReleaseForm() {
    if (this.newReleaseForm.valid) {
      this.errorMessage = '';
      // this.successMessage = 'Submitted successfully';
    } else {
      this.errorMessage = 'Please Enter Correct Data In All The Fields';
    }

    var release: Release = this.newReleaseForm.value;
    release['id'] = this.data.id;
    release.associatedProjects = this.selectedProjects;

    console.log(release, this.selectedProjects);
    this.successMessage = 'Creating the release';
    this.apiService.createRelease(release).subscribe((id: string) => {
      release.id = id;

      this.nitification.showNotification('Successfully Created the Release');
      this.dialogRef.close(release);
    });
  }
}
