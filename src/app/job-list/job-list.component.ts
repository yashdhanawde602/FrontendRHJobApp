import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule,NgFor } from '@angular/common';
import {Job} from '../job.model';
//import {RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//hii
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








  updateJob(jobId: number): void {
    console.log("Navigating to home page to update job with ID:", jobId);
    this.router.navigate(['/home'], { queryParams: { jobId: jobId } });
  }

  goBack(): void {
    this.location.back();
  }



  deleteJob(job: any) {
    const toastRef = this.toastr.warning(
      'Do you really want to delete this job?',
      'Confirm Deletion',
      {
        closeButton: true,
        tapToDismiss: false,
        positionClass: 'toast-top-center',
        disableTimeOut: true,
        enableHtml: true,
      }

    );


    const toastElement = document.querySelector('.toast-warning') as HTMLElement;
    if (toastElement) {

      const yesButton = document.createElement('button');
      yesButton.innerText = 'Yes';
      yesButton.className = 'btn btn-success btn-sm';
      yesButton.style.marginRight = '10px';
      yesButton.addEventListener('click', () => {


        this.proceedWithDelete(job);

      });



      const noButton = document.createElement('button');
      noButton.innerText = 'No';
      noButton.className = 'btn btn-danger btn-sm';
      noButton.addEventListener('click', () => {

        this.toastr.info('Job deletion canceled.', 'Canceled');

      }
      ) ;


      toastElement.appendChild(yesButton);
      toastElement.appendChild(noButton);

    }
  }

  proceedWithDelete(job: any) {
    const deleteUrl = `${this.apiUrl}/deletejob`;
    this.http.delete(deleteUrl, { body: job }).subscribe({
      next: () => {
        this.jobs = this.jobs.filter((j) => j.id !== job.id);
        this.toastr.success('Job deleted successfully', 'Success');
      },
      error: (err) => {
        console.error('Error deleting job:', err);
        this.toastr.error('Failed to delete job.', 'Error');
      },
    });
  }



}
