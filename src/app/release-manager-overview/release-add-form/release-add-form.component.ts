import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';

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
  stringPattern = /^\S*$/;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private apiService: ApiService) {}

  toolTipDelay = 300;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newReleaseForm = this.formBuilder.group({
      releaseName: new FormControl('', [Validators.required, Validators.pattern(this.stringPattern)]),
      releaseTag: new FormControl('', [Validators.required, Validators.pattern(this.stringPattern)]),
      requirementFreeze: new FormControl('', Validators.required),
      requirementDocument: new FormControl('', [Validators.required, Validators.pattern(this.stringPattern)]),
      featureFreeze: new FormControl('', Validators.required),
      codeFreeze: new FormControl('', Validators.required),
      uatCompletion: new FormControl(''),
      releaseDate: new FormControl('', Validators.required),
      releaseNote: new FormControl('')
    });
  }

  convertDateFormat(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  onSubmitReleaseForm() {
    // if (this.newReleaseForm.valid) {
    //   this.errorMessage = '';
    //   this.successMessage = 'Submitted successfully';
    // } else {
    //   this.errorMessage = 'Please Enter Correct Data In All The Fields';
    // }
    // const allDates = [];
    // allDates.push(
    //   (this.requirementFreeze = this.datePipe.transform(this.newReleaseForm.value.requirementFreeze, 'dd-MM-yyyy'))
    // );
    // allDates.push(
    //   (this.featureFreeze = this.datePipe.transform(this.newReleaseForm.value.featureFreeze, 'dd-MM-yyyy'))
    // );
    // allDates.push((this.codeFreeze = this.datePipe.transform(this.newReleaseForm.value.codeFreeze, 'dd-MM-yyyy')));
    // this.uatCompletion = this.datePipe.transform(this.newReleaseForm.value.this.newReleaseForm.value.newReleaseForm.valueion, 'dd-MM-yyyy');
    // if (this.uatCompletion) {
    //   allDates.push(this.uatCompletion);
    // }
    // allDates.push((this.releaseDate = this.datePipe.transform(this.newReleaseForm.value.releaseDate, 'dd-MM-yyyy')));
    // // Validation for all the valid dates
    // const nonValidDateFormat = allDates.some(el => {
    //   return el === null;
    // });
    // if (nonValidDateFormat) {
    //   this.errorMessage = 'Please Enter Valid Date Format';
    // } else {

    //   for (let i = 0; i < allDates.length; i++) {
    //     if (allDates[i] > allDates[i + 1]) {
    //       this.errorMessage = 'Former Date Cannot Be Greater Than Future Date';
    //     }
    //   }
    // }
    var release: Release = this.newReleaseForm.value;
    console.log(release);
    this.apiService.createRelease(release).subscribe(x => {
      console.log('Created release ', x);
    });
  }
}
