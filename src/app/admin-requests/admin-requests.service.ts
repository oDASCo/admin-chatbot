import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminRequestsService {

  constructor(
    public http: HttpClient
  ) {}

  public getUsers(): Observable<any> {
    return this.http.get<HttpResponse<any>>(environment.api.auth.register.users.url);
  }

  public approveUser(id): Observable<any> {
    return this.http.post<HttpResponse<any>>(environment.api.auth.register.adminApprove.url, id);
  }

}
