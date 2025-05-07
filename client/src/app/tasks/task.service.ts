import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { type QueryParams } from '../shared/query-params.model';
import { type Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = environment.apiUrl + 'api/tasks';
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  findAll(params: QueryParams): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl, {
      params: this.getHttpParams(params),
    });
  }

  findOne(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${id}`);
  }

  findByTitle(title: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}?name_like=${title}`);
  }

  create(task: Task): Observable<Task> {
    const { id, ...rest } = task;
    return this.httpClient.post<Task>(this.apiUrl, rest);
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
