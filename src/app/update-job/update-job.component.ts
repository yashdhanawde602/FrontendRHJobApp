import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardAvatar, MatCardHeader} from '@angular/material/card';
import {MatOption, MatSelect} from '@angular/material/select';
import {Location, NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './update-job.component.html',
    imports: [
        FormsModule,
        MatFormField,
        MatButton,
        MatInput,
        MatCard,
        MatCardAvatar,
        MatCardHeader,
        MatSelect,
        MatOption,
        RouterLink,
        MatError,
        NgIf,

    ],
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit{

job: any;

  constructor(private router: Router, private jobService: JobService, private activatedRoute: ActivatedRoute,private location: Location) {}


  saveJob(jobForm: NgForm): void {
    if (jobForm.valid) {
      console.log("Submitting job data:", this.job); // Debug log for job data
      this.jobService.updateJob(this.job).subscribe({
        next: (res: Job) => {
          console.log("Job saved successfully:", res);
          // Navigate to the desired page after a successful save
          this.router.navigate(['/job-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Error saving job:", err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.job = this.activatedRoute.snapshot.data['job']
    console.log(this.job)
  }
  goBack(): void {
    this.location.back();
  }
}
