import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule,NgFor } from '@angular/common';
import {Job} from '../job.model';
//import {RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-job-list',
  imports: [CommonModule, HttpClientModule, ],
  standalone:true,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  apiUrl = 'http://localhost:9090';


  constructor(private http: HttpClient,private router: Router,private location: Location,private toastr: ToastrService) {}



  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    const getUrl = `${this.apiUrl}/getjobs`;
    this.http.get<any[]>(getUrl).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.jobs = data;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      },
    });
  }


  deleteJob(job: Job) {
    const confirmation = confirm('Do you really want to delete this job?');

    if (confirmation) {
      const deleteUrl = `${this.apiUrl}/deletejob`;
      this.http.delete(deleteUrl, { body: job }).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(j => j.id !== job.id);
          console.log('Job deleted successfully');
          this.toastr.success('Job Deleted successfully', 'Success');

        },
        error: (err) => console.error('Error deleting job:', err),
      });
    } else {
      console.log('Job deletion canceled by the user.');
    }
  }



  updateJob(jobId: number): void {
    console.log("Navigating to home page to update job with ID:", jobId);
    this.router.navigate(['/home'], { queryParams: { jobId: jobId } });
  }

  goBack(): void {
    this.location.back();
  }

}
