import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from './job.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private  httpClient: HttpClient) { }

  api = "http://localhost:9090"

  public saveJob(job: Job): Observable<Job>{
    // @ts-ignore
    return this.httpClient.post(`${this.api}/addjob`, job);
  }

  public getJob(jobId: number){
    return this.httpClient.get<Job>(`${this.api}/getbyid/${jobId}`)
  }

  public updateJob(job: Job){
    return this.httpClient.put<Job>(`${this.api}/updatejob`,job)
  }

  public getJobById(jobId: number): Observable<Job> {
    return this.httpClient.get<Job>(`${this.api}/getbyid/${jobId}`);
  }

}
