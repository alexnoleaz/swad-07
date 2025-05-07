import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { type QueryParams } from '../shared/query-params.model';
import { type Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = environment.apiUrl + '/api/tasks';
  private readonly apiUrl2 = environment.apiUrl + '/api/664/tasks';
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  findAll(params?: QueryParams): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(this.apiUrl, {
        params: this.getHttpParams(params ?? {}),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return throwError(
            () => new Error('An error ocurred while fetching tasks')
          );
        })
      );
  }

  findOne(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(task: Task): Observable<Task> {
    const { id, ...rest } = task;
    return this.httpClient.post<Task>(this.apiUrl2, rest);
  }

  update(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  private getHttpParams(params: QueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (params.page) httpParams.set('_page', params.page);
    if (params.limit) httpParams.set('_limit', params.limit);
    if (params.sort) httpParams.set('_sort', params.sort);
    if (params.order) httpParams.set('_order', params.order);

    return httpParams;
  }
}
