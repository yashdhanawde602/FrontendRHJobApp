import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatCard, MatCardAvatar, MatCardHeader} from '@angular/material/card';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    NgIf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  job: Job = {
    JobTitle: "",
    JobDescription: "",
    JobType: "",
    Company: "",
    Salary: 0,
  };
  isEditMode: boolean = false; // Flag to track whether we are in update mode

  constructor(
    private router: Router,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const jobIdParam = this.activatedRoute.snapshot.queryParamMap.get('jobId');
    const jobId = jobIdParam ? Number(jobIdParam) : null;
    if (jobId) {
      this.isEditMode = true; // Enable edit mode
      this.fetchJob(jobId); // Fetch the job data
    } else {
      console.warn('No jobId found in query parameters; switching to add mode.');
    }
  }

  fetchJob(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe({
      next: (data: Job) => {
        this.job = data; // Set the job data in the form
        console.log("Fetched job for editing:", data);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching job:', err);
      }
    });
  }

  saveJob(jobForm: NgForm): void {
    if (jobForm.valid) {
      if (this.isEditMode) {
        if (!this.job.id) {
          console.error('Job ID is missing for the update operation');
          return;
        }
        this.jobService.updateJob(this.job).subscribe({
          next: (res: Job) => {
            console.log('Job updated successfully:', res);
            this.toastr.success('Job updated successfully', 'Success');
            this.router.navigate(['/job-list']);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error updating job:', err);
          }
        });
      } else {
        this.jobService.saveJob(this.job).subscribe({
          next: (res: Job) => {
            console.log('Job saved successfully:', res);
            this.toastr.success('Job added successfully', 'Success');
            this.router.navigate(['/job-list']);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error saving job:', err);
          }
        });
      }
    }
  }
}
