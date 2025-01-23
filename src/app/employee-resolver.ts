import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {JobService} from './job.service';
import {inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Job} from './job.model';

export const EmployeeResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot,
   jobService: JobService = inject(JobService)) :Observable<Job> => {

  const jobId = route.paramMap.get("jobId")

    if (jobId){
      return jobService.getJob(Number(jobId))
    }
    else {
      const job: Job = {
        id: 0,
        JobType: '',
        JobDescription: '',
        JobTitle: '',
        Salary: 0,
        Company:''
      }
      return of(job)
    }
  }
