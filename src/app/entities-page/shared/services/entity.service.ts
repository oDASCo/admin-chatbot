import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class EntityService {

  constructor(
    public http: HttpClient
  ) {}

  public getEntities(chatbotId, pageNum, size): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}?pageNumber=${pageNum}&size=${size}`);
  }

  public deleteEntity(chatbotId, id): Observable<any> {
    return this.http.delete<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}/${id}`);
  }

  public addEntity(chatbotId, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}`, data);
  }

  public addExample(chatbotId, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}/examples`, data);
  }

  public getEntityById(chatbotId, id): Observable<any> {
    return this.http.get<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}/${id}`);
  }

  public updateEntity(chatbotId, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}`, data);
  }

  public findEntityByExample(chatbotId, data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`backend/api/chatbot/${chatbotId}${environment.api.entity.url}/intent/example`, data);
  }
}
